import User from "../models/userModel.js";

export const searchContacts = async (req, res) => {
    try {
      const { searchTerm } = req.body;
      if (searchTerm === undefined || searchTerm === null) {
        return res.status(400).send("searchTerm is required");
      }
      
      const sanitisedSearchItem = searchTerm.replace(
        /[.**?^{}()|[\]\\]/g, "\\$&"
      );

      const regex = new RegExp(sanitisedSearchItem, "i");
      const contacts = await User.find({
        $and: [
          { _id: { $ne: req.userId } },
          {
            $or: [
              { firstName: regex },
              { lastName: regex },
              { email: regex }
            ]
          }
        ],
      }).select('-password'); 

      return res.status(200).json({ contacts });
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
};