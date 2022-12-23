// ternary operator
// condition ? true : condition2 ? true : condition3 ? true : false
// someTypes extends otherType ? trueType : falseType

type someType<T> = T extends string ? string : boolean;
type someValue = someType<string>; // string
