
import React from "react";
import { Container } from "./ui/container";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  return (
    <section id="pricing" className="py-16 bg-white">
      <Container>
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-bamboo-navy mb-6">Pricing</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Start for free. Upgrade to get the capacity that exactly matches your business needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-6">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>
              <p className="text-gray-600 mt-2">For getting started</p>
            </CardHeader>
            <CardContent className="px-6 py-2 flex-grow">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-bamboo-primary mr-2" />
                  <span>See mock creatives</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-bamboo-primary mr-2" />
                  <span>Setup your first campaign</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="p-6 pt-4">
              <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800">
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {/* Standard Plan */}
          <Card className="border border-bamboo-primary shadow-md hover:shadow-lg transition-shadow relative">
            <div className="absolute -top-3 left-0 right-0 flex justify-center">
              <span className="bg-blue-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                POPULAR
              </span>
            </div>
            <CardHeader className="p-6">
              <h3 className="text-xl font-bold mb-2">Standard</h3>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">$100</span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>
              <p className="text-gray-600 mt-2">Launch campaigns</p>
              <p className="text-xs text-gray-500 mt-1">
                *Monthly fee goes toward ad credits. 10% of ad spend applies, and is subtracted from the $100 if greater.
              </p>
            </CardHeader>
            <CardContent className="px-6 py-2 flex-grow">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-bamboo-primary mr-2" />
                  <span>Tag your website to measure actions</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-bamboo-primary mr-2" />
                  <span>Launch campaigns</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-bamboo-primary mr-2" />
                  <span>24/7 AI Account Manager and Data Analyst</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="p-6 pt-4">
              <Button className="w-full bg-bamboo-primary hover:bg-bamboo-secondary text-white">
                Upgrade
              </Button>
            </CardFooter>
          </Card>

          {/* Premium Plan */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-6">
              <h3 className="text-xl font-bold mb-2">Premium</h3>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">$500</span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>
              <p className="text-gray-600 mt-2">Omni-channel activation</p>
              <p className="text-xs text-gray-500 mt-1">
                *Monthly fee goes toward ad credits. 10% of ad spend applies, and is subtracted from the $500 if greater.
              </p>
            </CardHeader>
            <CardContent className="px-6 py-2 flex-grow">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-bamboo-primary mr-2" />
                  <span>More creative options</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-bamboo-primary mr-2" />
                  <span>Omni-channel activation</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-bamboo-primary mr-2" />
                  <span>Unlimited messages</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="p-6 pt-4">
              <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800">
                Contact Sales
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default Pricing;
