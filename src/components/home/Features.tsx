import { motion } from "framer-motion";

export function Features() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_85%)]" />
      
      <div className="container relative mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
            <img
              src="https://cdn.hswstatic.com/gif/nfc-4.jpg"
              alt="Scanning clothes with NFC technology"
              className="relative w-full h-auto rounded-2xl shadow-xl transform group-hover:scale-[1.01] transition-transform duration-300"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              INNOVATION BOUGHT TO CLOTHING
            </h2>
          </motion.div>
        </motion.div>

        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            What makes us stand out?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-muted-foreground mb-12"
          >
            Interactive Clothing Experience
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-12">
            {[
              {
                icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e63048cc4e8ffc2ec8cf92ac2e2cebe68b5b94687e84ede923a835e7117b8ec3",
                title: "NFT Integration for Value Enhancement",
                description: "With NFC tags, customers can instantly access detailed information about each item, including its origin, material, care instructions, and even previous ownership history, promoting transparency and trust."
              },
              {
                icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c31af36f66e6b6f437c132e68afe947c216aad1ea61a330ef9a2dd8963fb3fb6",
                title: "Blockchain-Powered Thrifting",
                description: "The NFC tags can be used to verify the authenticity of high-end or vintage items, ensuring that customers are getting genuine pieces and not counterfeit ones."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-6 group"
              >
                <img src={feature.icon} alt={feature.title} className="w-16 h-16 transform group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e308861900c91ad228b93e30af1f0bbd03ae1e0d2a26f5dc9a3f53c39e4b1d86"
              alt="Feature showcase"
              className="relative w-full h-auto rounded-2xl shadow-xl transform group-hover:scale-[1.01] transition-transform duration-300"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}