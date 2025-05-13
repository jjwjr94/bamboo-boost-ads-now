
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(7, { message: "Please enter a valid phone number" }),
  companyUrl: z.string().min(3, { message: "Please enter your company website" }),
  companyDescription: z.string().min(10, { message: "Please tell us a bit about your company" }),
});

interface OnboardingFormMessageProps {
  onSubmitSuccess?: () => void;
}

const OnboardingFormMessage: React.FC<OnboardingFormMessageProps> = ({ onSubmitSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phone: "",
      companyUrl: "",
      companyDescription: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      setSubmissionError(null);
      
      console.log("Submitting form to edge function:", values);
      
      try {
        // Use supabase client to invoke the function instead of direct fetch
        const { data, error } = await supabase.functions.invoke('send-onboarding', {
          body: values
        });
        
        console.log("Edge function response:", data, error);
        
        if (error) {
          throw new Error(error.message || "Failed to submit the form");
        }
        
        // Mark as submitted and show success message
        setIsSubmitted(true);
        toast({
          title: "Submission received",
          description: "Thanks for your information! Our team will be in touch soon.",
        });
        
        // Call the success callback if provided
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      } catch (error: any) {
        console.error("Error invoking function:", error);
        throw error;
      }
      
    } catch (error: any) {
      console.error("Error submitting onboarding form:", error);
      setSubmissionError(error.message || "There was an error submitting your information. Please try again.");
      toast({
        title: "Submission failed",
        description: "There was an error submitting your information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 max-w-[90%]">
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center py-4">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-center mb-2">Information Submitted</h3>
          <p className="text-center text-gray-600">
            Thanks for sharing your details. Our team will be in touch soon!
          </p>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Please share some information to get started</h3>
            
            {submissionError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{submissionError}</AlertDescription>
              </Alert>
            )}
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} />
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
                    <Input placeholder="+1 (555) 123-4567" {...field} />
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
                    <Input placeholder="https://example.com" {...field} />
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
                  <FormLabel>Tell us about your company</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What does your company do? Who are your customers?" 
                      className="resize-none min-h-[100px]" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full bg-bamboo-primary hover:bg-bamboo-secondary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default OnboardingFormMessage;
