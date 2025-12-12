'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageSquare, X, Send, Loader2, Bot } from 'lucide-react';
import { chat } from '@/ai/flows/chat-flow';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import { chatbotSuggestions } from '@/lib/chatbot-suggestions';
import { Badge } from '@/components/ui/badge';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
        setIsLoading(true);
        setTimeout(() => {
            setMessages([
                { role: 'model', content: 'Hello! I am DelayBot. How can I help you with your flight operation queries today?' }
            ]);
            setIsLoading(false);
        }, 1000);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async (messageText?: string) => {
    const message = messageText || input;
    if (!message.trim()) return;

    setShowSuggestions(false);
    const userMessage: Message = { role: 'user', content: message };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const historyForApi = messages.map(msg => ({
            role: msg.role as 'user' | 'model',
            content: [{ text: msg.content }]
        }));

      const response = await chat({
        history: historyForApi,
        message: message,
      });
      
      const modelMessage: Message = { role: 'model', content: response.message };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: Message = { role: 'model', content: 'Sorry, I encountered an error. Please try again.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button onClick={() => setIsOpen(!isOpen)} size="icon" className="rounded-full w-14 h-14 shadow-lg">
          {isOpen ? <X /> : <MessageSquare />}
        </Button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50">
          <Card className="w-80 h-[32rem] flex flex-col shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bot className="text-primary"/> DelayBot Assistant
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-6 w-6">
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-0">
                <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={cn('flex items-start gap-2', msg.role === 'user' ? 'justify-end' : '')}>
                                {msg.role === 'model' && <Bot className="text-primary mt-1 flex-shrink-0"/>}
                                <div className={cn('p-3 rounded-lg max-w-[80%]', msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                    <p className="text-sm">{msg.content}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-center gap-2">
                                <Bot className="text-primary mt-1 flex-shrink-0 animate-pulse"/>
                                <div className="p-3 rounded-lg bg-muted">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className="flex-col items-start">
               {showSuggestions && (
                <div className="w-full mb-2">
                  <p className="text-xs text-muted-foreground mb-2">Suggestions:</p>
                  <div className="flex flex-wrap gap-2">
                    {chatbotSuggestions.map((q, i) => (
                      <Badge 
                        key={i} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-accent"
                        onClick={() => handleSuggestionClick(q)}
                      >
                        {q}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex w-full items-center space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about delays..."
                  disabled={isLoading}
                />
                <Button onClick={() => handleSend()} disabled={isLoading} size="icon">
                  <Send />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
