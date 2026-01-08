import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  registerNumber: z.string().min(5, "Invalid register number").max(20),
  department: z.string().min(1, "Please select a department"),
  year: z.string().min(1, "Please select your year"),
  sport: z.string().min(1, "Please select a sport"),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number"),
});

type FormData = z.infer<typeof formSchema>;

const departments = [
  "Computer Science",
  "Electronics",
  "Mechanical",
  "Civil",
  "Electrical",
  "Commerce",
  "Arts",
  "Science",
];

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const sports = [
  "Cricket",
  "Football",
  "Basketball",
  "Badminton",
  "Volleyball",
  "Table Tennis",
];

export const RegistrationSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      registerNumber: "",
      department: "",
      year: "",
      sport: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = (data: FormData) => {
    // In a real app, this would send data to a backend
    console.log("Registration submitted:", data);
    setIsSubmitted(true);
    toast({
      title: "Registration Successful! 🎉",
      description: "Welcome to Titans Sports Club. We'll contact you soon.",
    });
  };

  if (isSubmitted) {
    return (
      <section id="register" className="py-20 md:py-28 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-success" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-primary-foreground tracking-wider mb-4">
              WELCOME TO THE TEAM!
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Your registration has been submitted successfully. Our team will review your application and contact you within 48 hours.
            </p>
            <Button
              variant="athletic"
              onClick={() => setIsSubmitted(false)}
            >
              Register Another Player
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="py-20 md:py-28 bg-primary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-widest mb-3">
            Become a Titan
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground tracking-wider">
            PLAYER <span className="text-gradient">REGISTRATION</span>
          </h2>
          <p className="text-primary-foreground/70 mt-4 max-w-xl mx-auto">
            Fill out the form below to join our sports club. All fields are required.
          </p>
        </div>

        {/* Form */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-2xl p-6 md:p-10 shadow-xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Register Number */}
                  <FormField
                    control={form.control}
                    name="registerNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Register Number</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 2024CS001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Department */}
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Year */}
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year of Study</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Sport */}
                  <FormField
                    control={form.control}
                    name="sport"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Sport</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select sport" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {sports.map((sport) => (
                              <SelectItem key={sport} value={sport}>
                                {sport}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@college.edu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Phone - Full Width */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="10-digit mobile number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" variant="athletic" size="lg" className="w-full">
                  Submit Registration
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};
