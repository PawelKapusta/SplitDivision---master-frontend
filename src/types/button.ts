export type TButton =
    | "Login"
    | "Register"
    | "Contact"
    | "CreateGroup"
    | "UpdateProfile";

export const ButtonTypes = {
    Login: {
        background: "linear-gradient(to right, #6a0dad, #330766)",
    },
    Register: {
        background: "linear-gradient(to right, #4b79a1, #283e51)",
    },
    Contact: {
        background: "linear-gradient(to right, #00c6ff, #0072ff)",
    },
    CreateGroup: {
        background: "linear-gradient(to right, #00c6ff, #0072ff)",
    },
    UpdateProfile: {
        background: "linear-gradient(to right, #799f0c, #acbb78);",
    },
};
