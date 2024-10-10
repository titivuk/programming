package main

import (
	"encoding/json"
	"fmt"
	"time"
)

// CUSTOM TYPE APPROACH

type RFC822ZTime struct {
	time.Time // embed time.Time
}

func (rt RFC822ZTime) MarshalJSON() ([]byte, error) {
	out := rt.Time.Format(time.RFC822Z)
	return []byte(`"` + out + `"`), nil
}

func (rt *RFC822ZTime) UnmarshalJSON(b []byte) error {
	if string(b) == "null" {
		return nil
	}
	t, err := time.Parse(`"`+time.RFC822Z+`"`, string(b))
	if err != nil {
		return err
	}
	*rt = RFC822ZTime{t}
	return nil
}

type Order1 struct {
	ID        string      `json:"id"`
	OrderedAt RFC822ZTime `json:"ordered_at"`
}

// SAME TYPE WITH EMBEDDING APPROACH

type Order2 struct {
	ID        string    `json:"id"`
	OrderedAt time.Time `json:"ordered_at"`
}

func (o Order2) MarshalJSON() ([]byte, error) {
	type Dup Order2

	tmp := struct {
		OrderedAt string `json:"ordered_at"` // override field with custom parsing
		Dup              // embed Dup which is actually Order2 but without methods
	}{
		Dup: (Dup)(o),
	}

	tmp.OrderedAt = o.OrderedAt.Format(time.RFC822Z) // manually set desired format for tmp.OrderedAt
	out, err := json.Marshal(tmp)                    // marshal tmp
	return out, err
}

func (o *Order2) UnmarshalJSON(b []byte) error {
	type Dup Order2

	tmp := struct {
		OrderedAt string `json:"ordered_at"` // override field with custom parsing
		*Dup             // embed Dup which is actually Order2 but without methods. Pointer is embedded so underlying o will be modified
	}{
		Dup: (*Dup)(o),
	}

	err := json.Unmarshal(b, &tmp) // unmarshal all `o` fields except OrderedAt. tmp.OrderedAt is unmarshalled instead
	if err != nil {
		return err
	}

	o.OrderedAt, err = time.Parse(time.RFC822Z, tmp.OrderedAt) // manually set o.OrderedAt using correct layout
	return err
}

func main() {
	// separate type
	o1 := Order1{
		ID:        "id",
		OrderedAt: RFC822ZTime{time.Now()},
	}
	// marshal
	buf1, err := json.Marshal(o1)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Custom type marshalled order: \"%s\"\n", string(buf1))
	// unmarshal
	var o1Out Order1
	json.Unmarshal(buf1, &o1Out)
	fmt.Printf("Custom type unmarshalled order: %+v\n", o1Out)

	// same type embedding
	// separate type
	o2 := Order2{
		ID:        "id",
		OrderedAt: time.Now(),
	}
	// marshal
	buf2, err := json.Marshal(o2)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Same type marshalled order: \"%s\"\n", string(buf2))
	// unmarshal
	var o2Out Order2
	json.Unmarshal(buf2, &o2Out)
	fmt.Printf("Same type unmarshalled order: %+v\n", o2Out)
}
