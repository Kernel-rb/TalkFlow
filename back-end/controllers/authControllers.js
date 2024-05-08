export const signupUser = async (req, res) => {
    try {
        
        const { fullName, username, password, password2, gender } = req.body;
        if (!fullName || !username || !password || !password2 || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }
    }catch(enrror) {
        console.log(error);
    }
};




export const loginUser = async (req, res) => {
    console.log("Login user");
};
export const logoutUser = async (req, res) => {
    console.log("Logout user");
};