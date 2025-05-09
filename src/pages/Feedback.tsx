
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
import { supabase } from "@/integrations/supabase/client";

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
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
    setSubmitSuccess(false);
    
    try {
      // Call the Supabase Edge Function to send the feedback email
      const { data, error } = await supabase.functions.invoke('send-feedback', {
        body: {
          name: values.name,
          email: values.email,
          feedback: values.feedback,
          contactConsent: values.contactConsent
        }
      });
      
      if (error) {
        throw new Error(error.message || "Failed to send feedback");
      }
      
      // Even if there's a warning about email delivery, we consider the feedback submission successful
      setSubmitSuccess(true);
      
      toast.success("Thank you for your feedback!", {
        description: "We appreciate your input and will review it shortly.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error processing feedback:", error);
      setEmailError("We couldn't send your feedback. Please try again later.");
      toast.error("Failed to submit feedback", {
        description: "Please try again later or contact support directly.",
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
              
              {submitSuccess ? (
                <div className="text-center py-8">
     <h3 className="text-2xl font-semibold mb-4" style={{ color: "#00D1A1" }}>
  Feedback Submitted!
</h3>
                  <p className="text-muted-foreground">
                    Thank you for taking the time to share your thoughts with us.
                    We appreciate your feedback and will use it to improve our services.
                  </p>
                  <Button 
                    onClick={() => {
                      setSubmitSuccess(false);
                      form.reset();
                    }}
                    variant="outline"
                    className="mt-6"
                  >
                    Submit More Feedback
                  </Button>
                </div>
              ) : (
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
              )}
            </CardContent>
          </Card>
        </div>
      </Container>
      
      <Footer />
    </div>
  );
};

export default Feedback;
