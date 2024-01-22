const Razorpay = require('razorpay');
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const razorpayInstance = new Razorpay({
    key_id: "rzp_test_YxKDPByiDYVh4W",
    key_secret: "qWQu0rFSFUvO7h0NWT23XmXG"
});

const renderProductPage = async (req, res) => {
    try {
        res.render('product');
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
}

const createOrder = async (req, res) => {
    try {
        const amount = req.body.amount * 100;
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'razorUser@gmail.com'
        }

        razorpayInstance.orders.create(options, (err, order) => {
            if (err) {
                console.error(err);
                return res.status(400).send({ success: false, msg: err });
            }

            res.status(200).send({
                success: true,
                msg: 'Order Created',
                order_id: order.id,
                amount: amount,
                key_id: RAZORPAY_ID_KEY,
                product_name: req.body.name,
                description: req.body.description,
                contact: "7905424136",
                name: "Utkarsh trivedi",
                email: "trivediutkarsh1@gmail.com"
            });
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
}