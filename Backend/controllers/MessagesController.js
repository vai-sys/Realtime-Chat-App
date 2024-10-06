// import Message from "../models/MessagesModel.js"

// export const getMessages = async (req, res) => {
//     try {
//         const user1 = req.userId; 
//         const user2 = req.body.id; 

       
//         if (!user1 || !user2) {
//             return res.status(400).send("Both User Id required");
//         }

//         const messages = await Message.find({
//             $or: [
//                 {
//                     sender: user1,
//                     recipient: user2,
//                 },
//                 {
//                     sender: user2,
//                     recipient: user1,
//                 },
//             ],
//         }).sort({ timestamp: 1 });

//         return res.status(200).json({ messages });
//     } catch (err) {
//         console.error("Error:", err);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// };

import Message from "../models/MessagesModel.js";

export const getMessages = async (req, res) => {
  try {
    const user1 = req.userId; // Logged-in user
    const user2 = req.body.id; // The selected chat contact

    // Validate both user IDs
    if (!user1 || !user2) {
      return res.status(400).send("Both User IDs required");
    }

    // Fetch messages between the two users
    const messages = await Message.find({
      $or: [
        { sender: user1, recipient: user2 },
        { sender: user2, recipient: user1 }
      ]
    }).sort({ timestamp: 1 });

    // Debugging the fetched messages
    console.log("Fetched messages:", messages);

    return res.status(200).json({ messages });
  } catch (err) {
    console.error("Error fetching messages:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
