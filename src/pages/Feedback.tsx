import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Send } from "lucide-react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Container } from "@/components/ui/container";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  feedback: z.string().min(10, { message: "Feedback must be at least 10 characters" }),
  contactConsent: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const Feedback = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  // Initialize the form with React Hook Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      feedback: "",
      contactConsent: false,
    },
  });

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setEmailError(null);
    
    try {
      // Prepare email data
      const emailData = {
        from: "Bamboo AI Feedback <feedback@bamboo-ai.com>",
        to: "jay@ado-ai.com",
        subject: `Feedback from ${values.name}`,
        text: `
Name: ${values.name}
Email: ${values.email}
Contact Consent: ${values.contactConsent ? "Yes" : "No"}

Feedback:
${values.feedback}
        `,
        api_key: "re_dSmEYUSm_MxGLj64xsYZovsKqMdL8S2tr"
      };
      
      // Send the email using Resend API
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${emailData.api_key}`
        },
        body: JSON.stringify({
          from: emailData.from,
          to: emailData.to,
          subject: emailData.subject,
          text: emailData.text,
        })
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Failed to send email");
      }
      
      console.log("Email sent successfully:", result);
      
      toast.success("Thank you for your feedback!", {
        description: "We appreciate your input and will review it shortly.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error sending feedback email:", error);
      setEmailError("We couldn't send your feedback. Please try again later.");
      toast.error("Failed to submit feedback", {
        description: "Please try again later or contact support.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <Container className="flex-1 py-24">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">We Value Your Feedback</CardTitle>
              <CardDescription>
                Help us improve Bamboo AI by sharing your experience and suggestions.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {emailError && (
                <Alert variant="destructive" className="mb-6">
                  <AlertDescription>{emailError}</AlertDescription>
                </Alert>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="feedback"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Feedback</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Share your thoughts, suggestions, or experiences with Bamboo AI..." 
                            className="min-h-[150px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactConsent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-normal">
                            You can contact me about my feedback if needed
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-bamboo-primary hover:bg-bamboo-secondary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Feedback"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </Container>
      
      <Footer />
    </div>
  );
};

export default Feedback;
