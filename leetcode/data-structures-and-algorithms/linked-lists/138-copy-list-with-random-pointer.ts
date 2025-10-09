class _Node {
    val: number
    next: _Node | null
    random: _Node | null

    constructor(val?: number, next?: _Node, random?: _Node) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
        this.random = (random === undefined ? null : random)
    }
}

function copyRandomList(head: _Node | null): _Node | null {

    // create mapping between old and new nodes
    // Map supports object reference as key
    let source2copy = new Map();

    let cur = head;
    while (cur) {
        let newcur = new _Node(cur.val);
        source2copy.set(cur, newcur);

        cur = cur.next;
    }

    // once, source2copy have every source and copied node in the map
    // we can connect nodes and assign random

    // use dummy to store newhead in dummy.next
    const dummy = new _Node();
    cur = head;
    let newprev = dummy;
    while (cur) {
        let newcur = source2copy.get(cur)!;

        // if cur has random
        // set corresponding newrandom
        if (cur.random) {
            newcur.random = source2copy.get(cur.random)!
        }

        cur = cur.next;

        // connect new nodes together
        newprev.next = newcur;
        newprev = newprev.next;
    }

    return dummy.next;
};
