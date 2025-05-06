
import React from "react";
import { Container } from "./ui/container";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  return (
    <section id="pricing" className="py-16 bg-white">
      <Container>
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-bamboo-navy mb-6">Pricing</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Custom pricing for your needs. Guaranteed less than your freelancer.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Free Plan */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <CardHeader className="p-6">
              <h3 className="text-xl font-bold mb-2">Start For Free</h3>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">$0</span>
              </div>
              <p className="text-gray-600 mt-2">Creative & Campaign Setup</p>
            </CardHeader>
            <CardContent className="px-6 py-2 flex-grow">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-bamboo-primary mr-2" />
                  <span>Create ad creative mockups</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-bamboo-primary mr-2" />
                  <span>Setup your campaign strategy</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-bamboo-primary mr-2" />
                  <span>Access to AI creative tools</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="p-6 pt-4 mt-auto">
              <Button className="w-full bg-bamboo-primary hover:bg-bamboo-secondary text-white" asChild>
                <Link to="/chat">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Standard Plan */}
          <Card className="border border-bamboo-primary shadow-lg hover:shadow-xl transition-shadow relative flex flex-col">
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
              <span className="bg-bamboo-primary text-white text-sm font-medium px-4 py-1 rounded-full">
                Most Popular
              </span>
            </div>
            <CardHeader className="p-6">
              <h3 className="text-xl font-bold mb-2">Standard</h3>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">$300</span>
                <span className="text-gray-600 ml-1">/month</span>
              </div>
              <p className="text-gray-600 mt-2">Essential marketing toolkit</p>
            </CardHeader>
            <CardContent className="px-6 py-2 flex-grow">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-bamboo-primary mr-2" />
                  <span>All free features included</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-bamboo-primary mr-2" />
                  <span>Launch campaigns on 2 platforms</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-bamboo-primary mr-2" />
                  <span>Weekly performance reports</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-bamboo-primary mr-2" />
                  <span>Email support</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-bamboo-primary mr-2" />
                  <span>Creative optimization</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="p-6 pt-4 mt-auto">
              <Button className="w-full bg-bamboo-primary hover:bg-bamboo-secondary text-white" asChild>
                <Link to="/chat">Select Plan</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Contact for Pricing Plan */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative flex flex-col">
            <CardHeader className="p-6">
              <h3 className="text-xl font-bold mb-2">Omni-Channel</h3>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">Contact</span>
              </div>
              <p className="text-gray-600 mt-2">Custom pricing for your needs. <span className="font-bold text-bamboo-primary">Tell us about your freelancer + tooling costs. We'll do much better.</span></p>
            </CardHeader>
            <CardContent className="px-6 py-2 flex-grow">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-bamboo-primary mr-2" />
                  <span>Launch campaigns</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-bamboo-primary mr-2" />
                  <span>Omni-channel activation</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-bamboo-primary mr-2" />
                  <span>Account Manager</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-bamboo-primary mr-2" />
                  <span>Performance optimization</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="p-6 pt-4 mt-auto">
              <Button className="w-full bg-bamboo-primary hover:bg-bamboo-secondary text-white" asChild>
                <Link to="/chat">Contact Us</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default Pricing;
