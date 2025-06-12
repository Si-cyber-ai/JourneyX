
import { useState, useRef } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, MapPin, Image as ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

const SpotSubmissionForm = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  
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
      setPreview(null);
      
      toast({
        title: "Secret Spot Submitted!",
        description: "Your hidden gem has been submitted for review.",
        duration: 5000,
      });
    }, 5000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormState({ ...formState, image: file });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormState({ ...formState, image: null });
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="p-6 shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Share Your Secret Spot</h2>
            <p className="text-muted-foreground mt-1">Help others discover amazing places</p>
          </div>
          {preview && (
            <Button variant="outline" size="sm" onClick={removeImage}>
              <X className="mr-2" /> Remove Image
            </Button>
          )}
        </div>

        <form onSubmit={submitForm} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <Label htmlFor="title">Spot Title</Label>
                <Input
                  id="title"
                  placeholder="Give your hidden gem a name"
                  value={formState.title}
                  onChange={e => setFormState({ ...formState, title: e.target.value })}
                  required
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formState.type}
                    onValueChange={value => setFormState({ ...formState, type: value })}
                    required
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select type" />
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

                <div>
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select
                    value={formState.difficulty}
                    onValueChange={value => setFormState({ ...formState, difficulty: value })}
                    required
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy (Accessible)</SelectItem>
                      <SelectItem value="Medium">Medium (Some effort)</SelectItem>
                      <SelectItem value="Expert">Expert (Challenging)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <div className="relative mt-2">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Address or coordinates"
                    value={formState.location}
                    onChange={e => setFormState({ ...formState, location: e.target.value })}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell us about this hidden gem and any special tips to find it"
                  value={formState.description}
                  onChange={e => setFormState({ ...formState, description: e.target.value })}
                  rows={4}
                  required
                  className="mt-2"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Spot Image</Label>
                <div className="mt-2">
                  <AnimatePresence>
                    {preview ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative rounded-lg overflow-hidden"
                      >
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-full h-[300px] object-cover rounded-lg"
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <div className="text-sm text-muted-foreground">
                          <p className="font-medium">Click to upload</p>
                          <p className="mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <Input
                    ref={fileInputRef}
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {formState.submitting && (
            <div className="w-full bg-muted rounded-full h-2.5">
              <motion.div 
                className="bg-primary h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${formState.progress}%` }}
                transition={{ duration: 0.5 }}
              />
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {formState.progress}% Complete
              </p>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full"
            disabled={formState.submitting}
            size="lg"
          >
            {formState.submitting ? (
              <span className="flex items-center">
                <Upload className="animate-bounce mr-2" />
                Uploading...
              </span>
            ) : (
              "Share Secret Spot"
            )}
          </Button>
        </form>
      </Card>
    </motion.div>
  );
};

export default SpotSubmissionForm;
