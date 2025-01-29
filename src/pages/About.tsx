import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen bg-[#F5F2F2]">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        {/* NFC Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-10 text-center font-['Clash_Display']">
            How NFC Make's Thrifting Interesting?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#D9D9D9] p-6 rounded-lg">
              <p className="text-lg">
                Embrace eco-friendly fashion by choosing thrifted items with a purpose.
              </p>
            </div>
            <div className="bg-[#D9D9D9] p-6 rounded-lg">
              <p className="text-lg">
                Discover the story behind each piece with a simple tap
              </p>
            </div>
            <div className="bg-[#D9D9D9] p-6 rounded-lg">
              <p className="text-lg">
                Shop smarter with cutting-edge NFC integration that sets us apart.
              </p>
            </div>
            <div className="bg-[#D9D9D9] p-6 rounded-lg">
              <p className="text-lg">
                Enjoy tailored suggestions and promotions linked directly to each item.
              </p>
            </div>
          </div>
        </section>

        {/* Why Thrifting Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-10 text-center font-['Clash_Display']">
            Why Thrifting is better?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#D9D9D9] p-6 rounded-lg">
              <p className="text-lg">
                Reduces clothing waste and supports eco-friendly fashion practices.
              </p>
            </div>
            <div className="bg-[#D9D9D9] p-6 rounded-lg">
              <p className="text-lg">
                Offers high-quality and designer items at a fraction of retail prices.
              </p>
            </div>
            <div className="bg-[#D9D9D9] p-6 rounded-lg">
              <p className="text-lg">
                Discover one-of-a-kind, vintage, and rare pieces for personal style.
              </p>
            </div>
            <div className="bg-[#D9D9D9] p-6 rounded-lg">
              <p className="text-lg">
                Avoids supporting fast fashion and unfair labor practices.
              </p>
            </div>
          </div>
        </section>

        {/* About Thrift ID Section */}
        <section className="bg-white rounded-lg p-8 mb-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <img src="/lovable-uploads/007ccff0-e2f2-4370-ba2c-8b7779d7ad7c.png" alt="Thrift Store" className="w-full h-auto rounded-lg" />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Thrift ID</h2>
              <h3 className="text-2xl font-semibold">Save More, Spend Less!</h3>
              <p className="text-gray-600">
                Discover Thrift ID, your ultimate destination for thrifty finds. With an extensive collection of pre-loved treasures, we offer a unique shopping experience that combines affordability and style. Uncover hidden gems, from fashionable clothing to exquisite home décor, all at unbeatable prices. Embrace the art of thriftiness and join our community of savvy shoppers. Thrift ID, where budget meets style.
              </p>
              <div className="space-x-4">
                <Button variant="default" className="bg-purple-600">Get the product</Button>
                <Button variant="outline">About the owner</Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;