import mongoose from "mongoose";

const repSchema = new mongoose.Schema({
  UserID: { type: String, required: true},
   Repname: { type: String, required: true },
  Desc: { type: String, },
  FilePath: {type:String,},
  CreatedAT: {type:Date, required: true},
  LastChanged: {type: Date, required: true}
 

});

export default mongoose.model("Rep", repSchema);
