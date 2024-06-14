import React, {
    useEffect,
    useState,
} from 'react';

export default function Home({ cartItem }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch('http://127.0.0.1:8000/api/');
                const jsonData = await result.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    async function addToCart(productId) {
        const user = JSON.parse(localStorage.getItem('user-info'));
        if (!user) {
            // Redirect to login if user is not logged in
            // You can customize this part based on your application flow
            return;
        }
        const userId = user.id;
        const qty = 1; // Set default quantity to 1
        const item = { userId, productId, qty };
        try {
            const result = await fetch("http://127.0.0.1:8000/api/add_to_cart", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(item)
            });
            const jsonData = await result.json();
            cartItem();
            console.log(jsonData);
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    }

    return (
        <>
            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {data.map((item) => (
                            <div className="col mb-5" key={item.id}>
                                <div className="card h-100 rounded-3">
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            <h5 className="fw-bolder">{item.name}</h5>
                                            <p>₱{item.price}</p>
                                            <p>{item.description}</p> {/* Display description */}
                                        </div>
                                    </div>
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center">
                                            <button className="btn btn-success btn-sm btn-block" onClick={() => addToCart(item.id)}>Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
