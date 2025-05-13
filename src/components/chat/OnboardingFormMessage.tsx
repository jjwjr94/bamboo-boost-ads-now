import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Mail, Phone, Globe, Building, Send, CheckCircle } from "lucide-react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Phone regex that accepts formats like (123) 456-7890, 123-456-7890, 123.456.7890, etc.
const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

// URL regex that requires http:// or https:// prefix
const urlRegex = /^https?:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([\/?#]\S*)?$/;

// Define the form schema with Zod
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().regex(phoneRegex, { message: "Please enter a valid phone number" }),
  companyUrl: z.string().regex(urlRegex, { message: "Please enter a valid URL starting with http:// or https://" }),
  companyDescription: z.string().min(10, { message: "Description must be at least 10 characters" }).max(500, { message: "Description cannot exceed 500 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

interface OnboardingFormMessageProps {
  onSubmitSuccess?: () => void;
}

const OnboardingFormMessage = ({ onSubmitSuccess }: OnboardingFormMessageProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [devNote, setDevNote] = useState<string | null>(null);

  // Initialize the form with React Hook Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phone: "",
      companyUrl: "https://",
      companyDescription: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setSubmissionError(null);
    setSubmitSuccess(false);
    setDevNote(null);
    
    try {
      // Call the Supabase Edge Function to send the onboarding email
      const { data, error } = await supabase.functions.invoke('send-onboarding', {
        body: {
          email: values.email,
          phone: values.phone,
          companyUrl: values.companyUrl,
          companyDescription: values.companyDescription
        }
      });
      
      if (error) {
        throw new Error(error.message || "Failed to send onboarding request");
      }
      
      setSubmitSuccess(true);
      
      // Check if there's a development note
      if (data && data.note) {
        setDevNote(data.note);
      }
      
      toast({
        title: "Success",
        description: "Onboarding request submitted! We'll get back to you shortly.",
        variant: "default",
      });
      
      form.reset();
      
      // Notify parent component of successful submission
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error("Error submitting onboarding request:", error);
      setSubmissionError("We couldn't send your request. Please try again later.");
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg border border-gray-100 w-full max-w-lg">
      {submissionError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{submissionError}</AlertDescription>
        </Alert>
      )}
      
      {devNote && (
        <Alert className="mb-4 bg-amber-50 border-amber-200">
          <AlertDescription className="text-amber-800">
            <strong>Developer Note:</strong> {devNote}
          </AlertDescription>
        </Alert>
      )}
      
      {submitSuccess ? (
        <div className="text-center py-4">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-2" />
          <h3 className="text-lg font-semibold mb-2" style={{ color: "#00D1A1" }}>
            Request Submitted!
          </h3>
          <p className="text-gray-600">
            Thank you for your interest in Bamboo AI. Our team will review your information
            and contact you shortly to begin the onboarding process.
          </p>
        </div>
      ) : (
        <div>
          <h3 className="font-medium text-lg mb-4">Complete Your Onboarding</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10" placeholder="your.email@company.com" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10" placeholder="(123) 456-7890" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Website</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10" placeholder="https://your-company.com" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Description</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Textarea 
                          className="pl-10 min-h-[100px]"
                          placeholder="Brief description of your company and how you plan to use our service..." 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-bamboo-primary hover:bg-bamboo-secondary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Onboarding Request"}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default OnboardingFormMessage;
