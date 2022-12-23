// là một  kiểu generic type

// type Developer = {
//    name:  string;
// } & Record<string, any>;
type Developer = {
   name: string;
   [key: string]: any;
};

const dd4tj: Developer = {
   name: 'Dat',
   age: 20,
   gender: 'male',
};

type OptionsFlags<Type> = {
   [Property in keyof Type]: boolean;
};
// Type: ['darkMode', 'newUserProfile']
// Property: darkMode: boolean, newUserProfile:boolean
type FeatureFlags = {
   darkMode: () => void;
   newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<FeatureFlags>;

// Mapping Modifiers
// Removes 'readonly' attributes from a type's properties
type CreateMutable<Type> = {
   -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
   readonly id: string;
   readonly name: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>;

// Removes 'optional' attributes from a type's properties
type Concrete<Type> = {
   [Property in keyof Type]-?: Type[Property];
};

type MaybeUser = {
   id: string;
   name?: string;
   age?: number;
};

type User = Concrete<MaybeUser>;

// key remapping via as (để đổi tên key trong object khi mapping qua object khác )
type Getters<Type> = {
   [Property in keyof Type as `get${Capitalize<
      string & Property
   >}`]: () => Type[Property];
};

interface Person {
   name: string;
   age: number;
   location: string;
}

type LazyPerson = Getters<Person>;
// type LazyPerson = {
//    getName: () => string;
//    getAge: () => number;
//    getLocation: () => string;
// }


// Remove the 'kind' property
type RemoveKindField<Type> = {
   [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
};

interface Circle {
   kind: "circle";
   radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;
// type KindlessCircle = {
//    radius: number;
// }

//You can map over arbitrary unions, not just unions of string | number | symbol, but unions of any type:
type EventConfig<Events extends { kind: string }> = {
   [E in Events as E["kind"]]: (event: E) => void;
}

type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };

type Config = EventConfig<SquareEvent | CircleEvent>
// type Config = {
//    square: (event: SquareEvent) => void;
//    circle: (event: CircleEvent) => void;
// }
