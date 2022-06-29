import { motion } from "framer-motion";
import { useState } from "react";

const Test3 = () => {
    const variants1 = {
        open: { x: "60%" },
        closed: { x: 0 },
    }

    const variants2 = {
        open: { display: "block" },
        closed: { display: "none" },
    }

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full flex overflow-x-hidden">
            <motion.div
                animate={isOpen ? "open" : "closed"}
                variants={variants2}
                transition={{
                    type: "tween",
                    default: { delay: 0.2 },
                }}
                className="p-5 fixed top-0 left-0 w-3/5 h-screen flex flex-col justify-around items-center bg-white"
            >
                <button onClick={() => setIsOpen(false)}>Close</button>

                <div>
                    <li>Home</li>
                    <li>Home</li>
                    <li>Home</li>
                    <li>Home</li>
                    <li>Home</li>
                    <li>Home</li>
                    <li>Home</li>
                    <li>Home</li>
                    <li>Home</li>
                    <li>Home</li>
                    <li>Home</li>
                    <li>Home</li>
                    <li>Home</li>
                    <li>Home</li>
                </div>
            </motion.div>

            <motion.div
                animate={isOpen ? "open" : "closed"}
                variants={variants1}
                transition={{
                    type: "tween",
                    default: { duration: 0.4 },
                }}
                className="p-10 relative w-full bg-gray-100 z-10"
            >
                <div className="fixed top-0 left-0 w-full h-8 bg-red-500"></div>
                <button onClick={() => setIsOpen(true)}>Open</button>

                <p style={{ height: '10000px' }} className="w-full">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat quaerat, facilis omnis ipsum, quisquam numquam recusandae itaque aut quas deserunt deleniti! Dolor, earum nesciunt voluptatum officiis maiores sed quo.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat quaerat, facilis omnis ipsum, quisquam numquam recusandae itaque aut quas deserunt deleniti! Dolor, earum nesciunt voluptatum officiis maiores sed quo.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat quaerat, facilis omnis ipsum, quisquam numquam recusandae itaque aut quas deserunt deleniti! Dolor, earum nesciunt voluptatum officiis maiores sed quo.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat quaerat, facilis omnis ipsum, quisquam numquam recusandae itaque aut quas deserunt deleniti! Dolor, earum nesciunt voluptatum officiis maiores sed quo.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat quaerat, facilis omnis ipsum, quisquam numquam recusandae itaque aut quas deserunt deleniti! Dolor, earum nesciunt voluptatum officiis maiores sed quo.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat quaerat, facilis omnis ipsum, quisquam numquam recusandae itaque aut quas deserunt deleniti! Dolor, earum nesciunt voluptatum officiis maiores sed quo.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat quaerat, facilis omnis ipsum, quisquam numquam recusandae itaque aut quas deserunt deleniti! Dolor, earum nesciunt voluptatum officiis maiores sed quo.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat quaerat, facilis omnis ipsum, quisquam numquam recusandae itaque aut quas deserunt deleniti! Dolor, earum nesciunt voluptatum officiis maiores sed quo.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat quaerat, facilis omnis ipsum, quisquam numquam recusandae itaque aut quas deserunt deleniti! Dolor, earum nesciunt voluptatum officiis maiores sed quo.
                </p>
            </motion.div>
        </div>
    )
}

export default Test3;