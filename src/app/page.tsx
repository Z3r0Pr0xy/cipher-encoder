'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Lock, Unlock, Copy } from 'lucide-react';
import { vigenereCipher } from '@/lib/cipher';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {
  const [message, setMessage] = useState('');
  const [keyword, setKeyword] = useState('');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const handleEncrypt = () => {
    if (!keyword) {
      toast({
        variant: 'destructive',
        title: 'Keyword Missing',
        description: 'Please enter a keyword to encrypt the message.',
      });
      return;
    }
    setOutput(vigenereCipher(message, keyword, false));
  };

  const handleDecrypt = () => {
    if (!keyword) {
      toast({
        variant: 'destructive',
        title: 'Keyword Missing',
        description: 'Please enter a keyword to decrypt the message.',
      });
      return;
    }
    setOutput(vigenereCipher(message, keyword, true));
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast({
        title: 'Copied!',
        description: 'The result has been copied to your clipboard.',
      });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24 bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(3,227,192,0.3),rgba(255,255,255,0))]"></div>
      <div className="z-10 w-full max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Cipher Encoder
          </h1>
          <p className="mt-2 text-muted-foreground">
            A simple tool for Vigenère cipher encryption and decryption.
          </p>
        </div>

        <Card className="w-full bg-card/70 backdrop-blur-sm border-primary/20 shadow-lg shadow-primary/10">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-primary">
              Message & Keyword
            </CardTitle>
            <CardDescription>
              Enter the text and the secret keyword below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your secret message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px] bg-input/80 border-primary/30 focus:border-primary focus:ring-primary"
              />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="keyword">Keyword</Label>
              <Input
                id="keyword"
                type="text"
                placeholder="e.g., SECRET"
                value={keyword}
                onChange={(e) =>
                  setKeyword(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))
                }
                className="bg-input/80 border-primary/30 focus:border-primary focus:ring-primary"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button
              onClick={handleEncrypt}
              className="bg-primary/90 hover:bg-primary text-primary-foreground"
            >
              <Lock className="mr-2 h-4 w-4" /> Encrypt
            </Button>
            <Button
              onClick={handleDecrypt}
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              <Unlock className="mr-2 h-4 w-4" /> Decrypt
            </Button>
          </CardFooter>
        </Card>

        {output && (
          <Card className="w-full bg-card/70 backdrop-blur-sm border-primary/20 shadow-lg shadow-primary/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-headline text-primary">
                  Result
                </CardTitle>
                <CardDescription>
                  The transformed message is below.
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={handleCopy}>
                <Copy className="h-5 w-5 text-accent" />
                <span className="sr-only">Copy to clipboard</span>
              </Button>
            </CardHeader>
            <CardContent>
              <Textarea
                readOnly
                value={output}
                className="min-h-[120px] bg-input/80 border-primary/30 text-lg font-mono tracking-wider text-green-300"
              />
            </CardContent>
          </Card>
        )}
      </div>
      <Toaster />
    </main>
  );
}
