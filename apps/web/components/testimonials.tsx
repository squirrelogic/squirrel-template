import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

const testimonials = [
  {
    name: "John Doe",
    company: "TechCorp Inc.",
    quote:
      "SquirrelSoft delivered our project on time and exceeded our expectations. Their team's expertise in SaaS development is unmatched.",
  },
  {
    name: "Jane Smith",
    company: "InnovateTech",
    quote:
      "Working with SquirrelSoft on our mobile app was a great experience. They were responsive, creative, and technically proficient.",
  },
  {
    name: "Mike Johnson",
    company: "GameWorld Studios",
    quote:
      "SquirrelSoft's game development skills are top-notch. They helped us bring our vision to life with stunning graphics and smooth gameplay.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 px-4 md:px-6 lg:px-8 bg-muted/50"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background">
              <CardHeader>
                <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {testimonial.company}
                </p>
              </CardHeader>
              <CardContent>
                <p className="italic">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
