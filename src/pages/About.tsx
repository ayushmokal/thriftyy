import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          <section className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Thrifty</h1>
            <p className="text-lg text-muted-foreground">
              Revolutionizing sustainable fashion through technology and community.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-lg transition-shadow animate-slide-in-right">
              <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
              <p className="text-muted-foreground">
                Welcome to Thrifty, your premier destination for sustainable fashion and second-hand clothing. 
                We believe in giving pre-loved clothing a second life while making fashion more accessible and 
                environmentally friendly.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow animate-slide-in-right [animation-delay:200ms]">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                To reduce fashion waste and promote sustainable shopping habits by creating a trusted 
                marketplace for pre-owned clothing. We aim to make second-hand shopping a delightful 
                experience while contributing to a more sustainable future.
              </p>
            </Card>
          </section>

          <section className="text-center space-y-6 animate-fade-in [animation-delay:400ms]">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="text-4xl font-bold text-primary">01</div>
                <h3 className="text-xl font-semibold">Browse</h3>
                <p className="text-muted-foreground">
                  Explore our curated collection of pre-loved fashion items
                </p>
              </div>
              <div className="space-y-4">
                <div className="text-4xl font-bold text-primary">02</div>
                <h3 className="text-xl font-semibold">Verify</h3>
                <p className="text-muted-foreground">
                  Each item is carefully verified for quality and authenticity
                </p>
              </div>
              <div className="space-y-4">
                <div className="text-4xl font-bold text-primary">03</div>
                <h3 className="text-xl font-semibold">Purchase</h3>
                <p className="text-muted-foreground">
                  Buy with confidence knowing each item meets our standards
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;