import Data from "../../modals/data.modal.js";

export let createData = async (req, res) => {
    try {
        let { amount, description, category, date, userId } = req.body;
        let isAvailable = await Data.findOne({ date: date, userId: userId, category: category });
        if (isAvailable) {
            let update = await Data.findOneAndUpdate(
                { 
                    date: date,
                    userId: userId,
                    category: category 
                },
                { amount, description, category, date },
                { new: true }
            );
            return res.status(200).json({ response: "Data created successfully", data: update, ok: true });
        } else {
            let newData = new Data({
                amount,
                description,
                category,
                date,
                userId
            });
            await newData.save();
            return res.status(201).json({ response: "Data created successfully", data: newData, ok: true });
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ response: "Server error", ok: false });
    }
}
export let editData = async(req, res)=>{
    try {
        let {amount, description, category, date} = req.body;
        let {id} = req.params;
        let findData = await Data.findByIdAndUpdate(id, {
            amount,
            description,
            category,
            date,
        }, {new:true});
        if(findData){
            return res.status(200).json({ok:true, response:"data updated"});
        }
        else{
            return res.status(400).json({ok:false, response:"error occured"});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ response: "Server error", ok: false });
    }
}

export let getData = async(req, res)=>{
    let {id} = req.params;

    try {
        let allData = await Data.find({userId:id});
        return res.status(200).json({ok:true, response:"found", data:allData});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ response: "Server error", ok: false });
    }
}

export let deleteData = async(req, res)=>{
    try {
        let {id} = req.params;
        let deleted = await Data.findByIdAndDelete(id);
        return res.status(200).json({ok:true, response:"deleted", deleted})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ response: "Server error", ok: false });
    }
}