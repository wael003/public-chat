const Message = require('../models/Chat');
const socket = require('../config/socket');

exports.getChats = (req, res)=>{
    Message.find()
    .populate('sender', 'username')
    .then(data=>{
        res.json(data)
    }).catch(err =>{
        res.status(500).json({err:  err});
    })
}

exports.send = async (req, res) => {
  try {
    // Save the message with sender (assumed to be ObjectId of user)

    const message = await new Message(req.body).save();

    // Re-fetch the message and populate the sender's name
    const populatedMessage = await Message.findById(message._id).populate('sender', 'username'); // or 'name' depending on your model

    const io = socket.getIO();
    io.emit('chat message', {
      sender: populatedMessage.sender.username, // or .name
      content: populatedMessage.content
    });

    res.json({ message: "The message was sent successfully!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
};
