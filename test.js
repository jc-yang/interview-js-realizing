
var invertTree = function (root) {
    dfs(root);
    return root;
}

function dfs(root) {
    if(!root) return;
    const temp = root.left;
    root.left = root.right;
    root.right = temp;
    dfs(root.left);
    dfs(root.right);
}

const example1 = {
    val: 4,
    left: {
        val: 2,
        left: {
            val: 1,
            left: null,
            right: null,
        },
        right: {
            val: 3,
            left: null,
            right: null,
        }
    },
    right: {
        val: 7,
        left: {
            val: 6,
            left: null,
            right: null,
        },
        right: {
            val: 9,
            left: null,
            right: null,
        }
    }
}

const res = invertTree(example1);
console.log(res)
