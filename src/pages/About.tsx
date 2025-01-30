import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <div className="container mx-auto py-12">
      <Card className="p-8">
        <h1 className="text-3xl font-bold mb-6">About Thrifty</h1>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Welcome to Thrifty, your premier destination for sustainable fashion and second-hand clothing. We believe in giving pre-loved clothing a second life while making fashion more accessible and environmentally friendly.
          </p>
          <p className="text-muted-foreground">
            Our platform connects fashion enthusiasts who want to sell their gently used clothing with buyers looking for unique, affordable pieces. Every item on our platform goes through a careful review process to ensure quality and authenticity.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p className="text-muted-foreground">
            To reduce fashion waste and promote sustainable shopping habits by creating a trusted marketplace for pre-owned clothing. We aim to make second-hand shopping a delightful experience while contributing to a more sustainable future.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default About;