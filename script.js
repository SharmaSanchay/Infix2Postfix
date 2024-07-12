class Stack {
    constructor() {
        this.items = [];
    }
    add(element) {
        return this.items.push(element);
    }
    remove() {
        if(this.items.length > 0) {
            return this.items.pop();
        }
    }
    top() {
        return this.items[this.items.length - 1];
    }
    
    isempty(){
       return this.items.length == 0;
    }
}
function tabelcontent(infix,element,out){
    if(element == undefined){
        element="";
    }
    if(out == undefined){
        out="";
    }
    tbodyEl.innerHTML+=`
      <tr>
            <td>${infix}</td>      
            <td>${element}</td>      
            <td>${out}</td>      
      </tr>
    `
}
function priority(alpha){
    if (alpha == '+' || alpha == '-')
        return 1;

    if (alpha == '*' || alpha == '/')
        return 2;

    if (alpha == '^')
        return 3;

    return 0;
}
function convert(infix){
     let postfix = "";
     let s = new Stack();
    for (let i = 0; i < infix.length; i++) {
        if ((infix[i] >= 'a' && infix[i] <= 'z') || (infix[i] >= 'A' && infix[i] <= 'Z') || (infix[i] >=0  && infix[i]<=9)) {
            postfix += infix[i];
        }
        else if (infix[i] == '(') {
            s.add(infix[i]);
        }
        else if (infix[i] == ')') {
            while (s.top() != '(') {
                postfix += s.top();
                s.remove();
            }
            s.remove();
        }
        else {
            while (!s.isempty() && priority(infix[i]) <= priority(s.top())) {
                postfix += s.top();
                s.remove();
            }
            s.add(infix[i]);
        }
        tabelcontent(infix,s.items,postfix);
    }
    while (!s.isempty()) {
        postfix = postfix + s.top();
        s.remove();
        tabelcontent(infix,s.items,postfix);
    }
    tabelcontent(infix,s.items,postfix);
    return postfix;
}
let postfix="";
const btn = document.querySelector(".btn");
const input = document.querySelector(".aim");
const ans = document.querySelector(".ans");
const tbodyEl = document.querySelector("tbody");
const tables = document.querySelector(".stepbystep");
btn.addEventListener('click',(e)=>{
    e.preventDefault();
    tbodyEl.innerHTML="";
    let infix = input.value;
    postfix = convert(infix);
    ans.innerHTML = postfix;
    tables.style.visibility="visible";
});
