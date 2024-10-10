import React from 'react'

function Contact() {
    return (
    <div class="container mx-auto px-4 py-12">
        <div class="w-[90%] mx-auto bg-white  rounded-lg p-8">
            <h1 class="text-3xl font-bold mb-6 text-pink-500">Contact Us</h1>
            <p class="mb-4 text-gray-700">
                Krish.com is dedicated to transforming the agricultural landscape through technology. We leverage innovative solutions to bridge the gap between farmers and merchants, ensuring seamless communication, transparency, and growth for everyone involved.
            </p>
            <p class="mb-4 text-gray-700">
                Since our inception, Krish.com has been committed to empowering farmers and merchants alike by providing them with tools and resources to connect efficiently. Our platform is designed with the needs of the agricultural community in mind, offering real-time market insights, secure communication, and a user-friendly experience.
            </p>
            <p class="mb-4 text-gray-700">
                Whether you have a suggestion, idea, or a fresh perspective, we’re all ears. We are always open to hearing from our users to make our platform better, more efficient, and tailored to your needs.
            </p>
            <p class="mb-6 text-gray-700">
                Are you shy or feeling formal? Just fill out the form below, and we will get back to you.
            </p>

            <form action="#" method="POST" class="shadow-lg p-10 space-y-6">
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">Your Name</label>
                    <input type="text" id="name" name="name" class="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Enter your name"/>
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Your Email</label>
                    <input type="email" id="email" name="email" class="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Enter your email"/>
                </div>
                <div>
                    <label for="message" class="block text-sm font-medium text-gray-700">Your Message</label>
                    <textarea id="message" name="message" rows="4" class="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Enter your message"></textarea>
                </div>
                <div>
                    <button type="submit" class="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 ">Send Message</button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default Contact
