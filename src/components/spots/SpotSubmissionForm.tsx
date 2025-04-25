
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const SpotSubmissionForm = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    type: "",
    difficulty: "",
    location: "",
    image: null as File | null,
    submitting: false,
    progress: 0
  });

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ ...formState, submitting: true, progress: 0 });
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setFormState(prev => {
        const newProgress = Math.min(prev.progress + 10, 100);
        if (newProgress === 100) {
          clearInterval(interval);
          return { ...prev, progress: newProgress, submitting: false };
        }
        return { ...prev, progress: newProgress };
      });
    }, 500);
    
    // Simulate API call delay
    setTimeout(() => {
      clearInterval(interval);
      setFormState({
        title: "",
        description: "",
        type: "",
        difficulty: "",
        location: "",
        image: null,
        submitting: false,
        progress: 0
      });
      
      toast({
        title: "Secret Spot Submitted!",
        description: "Your hidden gem has been submitted for review.",
        duration: 5000,
      });
    }, 5000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormState({ ...formState, image: e.target.files[0] });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-card p-6 rounded-xl shadow-lg max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6">Share Your Secret Spot</h2>
      <form onSubmit={submitForm} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Spot Title</Label>
          <Input
            id="title"
            placeholder="Give your hidden gem a name"
            value={formState.title}
            onChange={e => setFormState({ ...formState, title: e.target.value })}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={formState.type}
              onValueChange={value => setFormState({ ...formState, type: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select spot type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hike">Hiking Trail</SelectItem>
                <SelectItem value="Waterfall">Waterfall</SelectItem>
                <SelectItem value="Viewpoint">Viewpoint</SelectItem>
                <SelectItem value="Pub">Local Pub</SelectItem>
                <SelectItem value="Beach">Beach</SelectItem>
                <SelectItem value="Cave">Cave</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty</Label>
            <Select
              value={formState.difficulty}
              onValueChange={value => setFormState({ ...formState, difficulty: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Easy">Easy (Accessible)</SelectItem>
                <SelectItem value="Medium">Medium (Some effort)</SelectItem>
                <SelectItem value="Expert">Expert (Challenging)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Describe location or add coordinates"
            value={formState.location}
            onChange={e => setFormState({ ...formState, location: e.target.value })}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Tell us about this hidden gem and any special tips to find it"
            value={formState.description}
            onChange={e => setFormState({ ...formState, description: e.target.value })}
            rows={4}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="image">Upload Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          <p className="text-xs text-muted-foreground">Upload a high-quality image that showcases the spot (max 5MB)</p>
        </div>
        
        {formState.submitting && (
          <div className="w-full bg-muted rounded-full h-2.5">
            <div 
              className="bg-primary h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${formState.progress}%` }}
            ></div>
            <p className="text-xs text-muted-foreground mt-1 text-center">{formState.progress}% Complete</p>
          </div>
        )}
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={formState.submitting}
        >
          {formState.submitting ? "Submitting..." : "Submit Secret Spot"}
        </Button>
      </form>
    </motion.div>
  );
};

export default SpotSubmissionForm;
