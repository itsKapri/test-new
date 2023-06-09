const express=require("express");
const app=express();
const PORT=5007;
const connectDB=require("./connectdb");
const dotenv=require("dotenv").config();
const schemaModule=require("./schemaModule");

connectDB();
 app.use(express.json())

app.listen(PORT,()=>{
    console.log(`servr is running on ${PORT}`);
})

app.get('/',async (request,response)=>{
    try {
        const data= await schemaModule.find();
        console.log(data);
        response.json(data);
    } catch (error) {
        console.log(error);
    }

})


app.post('/',async (request,response)=>{
    try {
        const {username , password , email}=request.body;
        const Schema= await schemaModule.create({
            username,
            password,
            email,
        });
        response.json(Schema);
    } catch (error) {
        console.log(error);
    }
})

app.get('/:id', async (req, res) => {
    try {
        const contact = await schemaModule.findById(req.params.id);
        if (!contact) {
            res.status(404);
            throw new Error("Contact not found");
        } 
        res.status(200).json(contact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.put('/:id', async (req, res) => {
    try {
        const contact = await schemaModule.findById(req.params.id);
        if (!contact) {
            res.status(404);
            throw new Error("Contact not found");
        }
        const updatedContact = await schemaModule.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedContact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});