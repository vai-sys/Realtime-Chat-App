// import mongoose from "mongoose";
// const { Schema } = mongoose;
// import User from "./userModel.js"; 


// const messageSchema = new Schema({
//   sender: { type: Schema.Types.ObjectId, ref: User, required: true },  
//   recipient: { type: Schema.Types.ObjectId, ref: User, required: true },  
//   content: { type: String, required: true },
//   timestamp: { type: Date, default: Date.now },
// });

// const Message = mongoose.model("Message", messageSchema);

// export default Message;

import mongoose from "mongoose";
const { Schema } = mongoose;
import User from "./userModel.js"; 


const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: User, required: true },  
  recipient: { type: Schema.Types.ObjectId, ref: User, required: true },  
  content: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
