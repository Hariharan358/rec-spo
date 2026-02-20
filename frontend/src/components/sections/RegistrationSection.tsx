import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Sparkles } from "lucide-react";
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
import { motion, AnimatePresence } from "framer-motion";

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

const formFieldVariant = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.4 + i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

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
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="w-24 h-24 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            >
              <CheckCircle2 className="w-12 h-12 text-success" />
            </motion.div>
            <motion.h2
              className="font-display text-4xl md:text-5xl text-primary-foreground tracking-wider mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              WELCOME TO THE TEAM!
            </motion.h2>
            <motion.p
              className="text-primary-foreground/80 text-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Your registration has been submitted successfully. Our team will review your application and contact you within 48 hours.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button
                variant="athletic"
                onClick={() => setIsSubmitted(false)}
              >
                Register Another Player
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="py-20 md:py-28 bg-primary relative overflow-hidden">
      {/* Decorative floating elements */}
      <motion.div
        className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="inline-block text-secondary font-semibold text-sm uppercase tracking-widest mb-3"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Become a Titan
          </motion.span>
          <motion.h2
            className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground tracking-wider"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            PLAYER <span className="text-gradient">REGISTRATION</span>
          </motion.h2>
          <motion.p
            className="text-primary-foreground/70 mt-4 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            Fill out the form below to join our sports club. All fields are required.
          </motion.p>
          <motion.div
            className="mx-auto mt-6 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 200, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        {/* Form */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-card rounded-2xl p-6 md:p-10 shadow-xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <motion.div variants={formFieldVariant} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} className="transition-all duration-300 focus:scale-[1.01] focus:shadow-lg focus:shadow-violet-500/5" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* Register Number */}
                  <motion.div variants={formFieldVariant} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <FormField
                      control={form.control}
                      name="registerNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Register Number</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 2024CS001" {...field} className="transition-all duration-300 focus:scale-[1.01] focus:shadow-lg focus:shadow-violet-500/5" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* Department */}
                  <motion.div variants={formFieldVariant} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="transition-all duration-300 focus:scale-[1.01]">
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
                  </motion.div>

                  {/* Year */}
                  <motion.div variants={formFieldVariant} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year of Study</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="transition-all duration-300 focus:scale-[1.01]">
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
                  </motion.div>

                  {/* Sport */}
                  <motion.div variants={formFieldVariant} custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <FormField
                      control={form.control}
                      name="sport"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Sport</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="transition-all duration-300 focus:scale-[1.01]">
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
                  </motion.div>

                  {/* Email */}
                  <motion.div variants={formFieldVariant} custom={5} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@college.edu" {...field} className="transition-all duration-300 focus:scale-[1.01] focus:shadow-lg focus:shadow-violet-500/5" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                </div>

                {/* Phone - Full Width */}
                <motion.div variants={formFieldVariant} custom={6} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="10-digit mobile number" {...field} className="transition-all duration-300 focus:scale-[1.01] focus:shadow-lg focus:shadow-violet-500/5" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <Button type="submit" variant="athletic" size="lg" className="w-full transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/20">
                      Submit Registration
                    </Button>
                  </motion.div>
                </motion.div>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
