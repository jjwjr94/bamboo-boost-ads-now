
import React from "react";
import { Container } from "./ui/container";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <Container>
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-bamboo-navy mb-6">Pricing</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Start for free with creative and campaign setup. Contact us for pricing to activate campaigns.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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

          {/* Contact for Pricing Plan */}
          <Card className="border border-bamboo-primary shadow-md hover:shadow-lg transition-shadow relative flex flex-col">
            <CardHeader className="p-6">
              <h3 className="text-xl font-bold mb-2">Campaign Activation</h3>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">Contact</span>
              </div>
              <p className="text-gray-600 mt-2">Custom pricing for your needs. Tell us about your freelancer + tooling costs. We'll do much better. </p>
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
