import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { AboutMe, Education, Experience } from '@/types';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Trash2, Plus, Save, X, Edit, Book, Briefcase } from 'lucide-react';
import storageService from '@/services/storageService';
import { useToast } from '@/hooks/use-toast';
import { useAboutMe } from '@/hooks/useAboutMe';

const AdminAboutMe: React.FC = () => {
  const { aboutMe: initialAboutMe, loading } = useAboutMe();
  const [aboutMe, setAboutMe] = useState<AboutMe | null>(null);
  const [skills, setSkills] = useState<string>('');
  const [interests, setInterests] = useState<string>('');
  const [editingEducationId, setEditingEducationId] = useState<string | null>(null);
  const [education, setEducation] = useState<Education>({
    id: uuidv4(),
    degree: '',
    institution: '',
    year: '',
    description: '',
  });
  const [editingExperienceId, setEditingExperienceId] = useState<string | null>(null);
  const [experience, setExperience] = useState<Experience>({
    id: uuidv4(),
    position: '',
    company: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    if (initialAboutMe) {
      setAboutMe(initialAboutMe);
      setSkills(initialAboutMe.skills.join(', '));
      setInterests(initialAboutMe.interests.join(', '));
    }
  }, [initialAboutMe]);

  const form = useForm<{
    headline: string;
    bio: string;
    profileImage: string;
  }>({
    defaultValues: {
      headline: aboutMe?.headline || '',
      bio: aboutMe?.bio || '',
      profileImage: aboutMe?.profileImage || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    },
  });

  useEffect(() => {
    if (aboutMe) {
      form.reset({
        headline: aboutMe.headline,
        bio: aboutMe.bio,
        profileImage: aboutMe.profileImage,
      });
    }
  }, [aboutMe, form]);

  const handleSave = async (formData: { headline: string; bio: string; profileImage: string }) => {
    try {
      const skillsArray = skills ? skills.split(',').map(s => s.trim()) : 
        (aboutMe?.skills || []);
      
      const interestsArray = interests ? interests.split(',').map(i => i.trim()) : 
        (aboutMe?.interests || []);

      const updatedAboutMe: AboutMe = {
        id: aboutMe?.id || uuidv4(),
        headline: formData.headline,
        bio: formData.bio,
        skills: skillsArray,
        education: aboutMe?.education || [],
        experience: aboutMe?.experience || [],
        interests: interestsArray,
        profileImage: formData.profileImage,
        createdAt: aboutMe?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const savedData = await storageService.saveAboutMe(updatedAboutMe);
      if (savedData) {
        setAboutMe(savedData);
        toast({
          title: "Success!",
          description: "About Me information has been saved.",
        });
      }
    } catch (error) {
      console.error('Error saving about me:', error);
      toast({
        title: "Error",
        description: "Failed to save About Me information.",
        variant: "destructive",
      });
    }
  };

  const addEducation = async () => {
    if (!education.degree || !education.institution || !education.year) {
      toast({
        title: "Incomplete Information",
        description: "Please fill out all required education fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const updatedAboutMe = { ...aboutMe } as AboutMe;
      
      if (editingEducationId) {
        // Update existing education
        updatedAboutMe.education = updatedAboutMe.education.map(edu => 
          edu.id === editingEducationId ? { ...education } : edu
        );
      } else {
        // Add new education
        const newEducation = {
          ...education,
          id: uuidv4(),
        };
        updatedAboutMe.education = [...(updatedAboutMe.education || []), newEducation];
      }
      
      updatedAboutMe.updatedAt = new Date().toISOString();
      
      const savedData = await storageService.saveAboutMe(updatedAboutMe);
      if (savedData) {
        setAboutMe(savedData);
        setEducation({
          id: uuidv4(),
          degree: '',
          institution: '',
          year: '',
          description: '',
        });
        setEditingEducationId(null);
      }
    } catch (error) {
      console.error('Error updating education:', error);
      toast({
        title: "Error",
        description: "Failed to update education.",
        variant: "destructive",
      });
    }
  };

  const editEducation = (edu: Education) => {
    setEducation(edu);
    setEditingEducationId(edu.id);
  };

  const deleteEducation = async (id: string) => {
    if (!aboutMe) return;
    
    try {
      const updatedAboutMe = { ...aboutMe } as AboutMe;
      updatedAboutMe.education = updatedAboutMe.education.filter(edu => edu.id !== id);
      updatedAboutMe.updatedAt = new Date().toISOString();
      
      const savedData = await storageService.saveAboutMe(updatedAboutMe);
      if (savedData) {
        setAboutMe(savedData);
      }
    } catch (error) {
      console.error('Error deleting education:', error);
      toast({
        title: "Error",
        description: "Failed to delete education.",
        variant: "destructive",
      });
    }
  };

  const addExperience = async () => {
    if (!experience.position || !experience.company || !experience.startDate || !experience.description) {
      toast({
        title: "Incomplete Information",
        description: "Please fill out all required experience fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const updatedAboutMe = { ...aboutMe } as AboutMe;
      
      if (editingExperienceId) {
        // Update existing experience
        updatedAboutMe.experience = updatedAboutMe.experience.map(exp => 
          exp.id === editingExperienceId ? { ...experience } : exp
        );
      } else {
        // Add new experience
        const newExperience = {
          ...experience,
          id: uuidv4(),
        };
        updatedAboutMe.experience = [...(updatedAboutMe.experience || []), newExperience];
      }
      
      updatedAboutMe.updatedAt = new Date().toISOString();
      
      const savedData = await storageService.saveAboutMe(updatedAboutMe);
      if (savedData) {
        setAboutMe(savedData);
        setExperience({
          id: uuidv4(),
          position: '',
          company: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        });
        setEditingExperienceId(null);
      }
    } catch (error) {
      console.error('Error updating experience:', error);
      toast({
        title: "Error",
        description: "Failed to update experience.",
        variant: "destructive",
      });
    }
  };

  const editExperience = (exp: Experience) => {
    setExperience(exp);
    setEditingExperienceId(exp.id);
  };

  const deleteExperience = async (id: string) => {
    if (!aboutMe) return;
    
    try {
      const updatedAboutMe = { ...aboutMe } as AboutMe;
      updatedAboutMe.experience = updatedAboutMe.experience.filter(exp => exp.id !== id);
      updatedAboutMe.updatedAt = new Date().toISOString();
      
      const savedData = await storageService.saveAboutMe(updatedAboutMe);
      if (savedData) {
        setAboutMe(savedData);
      }
    } catch (error) {
      console.error('Error deleting experience:', error);
      toast({
        title: "Error",
        description: "Failed to delete experience.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Main Info */}
            <Card className="glass-card col-span-full">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
                  >
                    <Save className="mr-2 h-5 w-5" />
                  </motion.div>
                  General Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="headline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Headline</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Full Stack Developer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Biography</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Write a short bio about yourself..."
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
                  name="profileImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="URL to your profile image" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <FormItem>
                  <FormLabel>Skills (comma-separated)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="React, TypeScript, Node.js, etc."
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      defaultValue={aboutMe?.skills?.join(', ')}
                    />
                  </FormControl>
                </FormItem>
                {aboutMe?.skills && aboutMe.skills.length > 0 && (
                  <div className="mt-4">
                    <FormLabel>Current Skills:</FormLabel>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {aboutMe.skills.map((skill, index) => (
                        <div key={index} className="bg-foreground/10 text-foreground px-3 py-1 rounded-full text-xs">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Interests */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl">Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <FormItem>
                  <FormLabel>Interests (comma-separated)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Travel, Reading, Photography, etc."
                      value={interests}
                      onChange={(e) => setInterests(e.target.value)}
                      defaultValue={aboutMe?.interests?.join(', ')}
                    />
                  </FormControl>
                </FormItem>
                {aboutMe?.interests && aboutMe.interests.length > 0 && (
                  <div className="mt-4">
                    <FormLabel>Current Interests:</FormLabel>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {aboutMe.interests.map((interest, index) => (
                        <div key={index} className="bg-foreground/10 text-foreground px-3 py-1 rounded-full text-xs">
                          {interest}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Education */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl flex items-center">
                <Book className="mr-2 h-5 w-5" />
                Education
              </CardTitle>
              {editingEducationId && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setEditingEducationId(null);
                    setEducation({
                      id: uuidv4(),
                      degree: '',
                      institution: '',
                      year: '',
                      description: '',
                    });
                  }}
                >
                  <X className="h-4 w-4 mr-1" /> Cancel Editing
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormItem>
                  <FormLabel>Degree/Certification</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Bachelor of Science in Computer Science"
                      value={education.degree}
                      onChange={(e) => setEducation({...education, degree: e.target.value})}
                    />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormLabel>Institution</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="University of Technology"
                      value={education.institution}
                      onChange={(e) => setEducation({...education, institution: e.target.value})}
                    />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="2018 - 2022"
                      value={education.year}
                      onChange={(e) => setEducation({...education, year: e.target.value})}
                    />
                  </FormControl>
                </FormItem>
                <FormItem className="col-span-full">
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Brief description about your education..."
                      value={education.description || ''}
                      onChange={(e) => setEducation({...education, description: e.target.value})}
                    />
                  </FormControl>
                </FormItem>
              </div>
              
              <Button onClick={addEducation} className="w-full" variant="outline">
                <Plus className="h-4 w-4 mr-1" /> {editingEducationId ? 'Update Education' : 'Add Education'}
              </Button>
              
              {aboutMe?.education && aboutMe.education.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="font-medium">Education History</h4>
                  {aboutMe.education.map((edu) => (
                    <div key={edu.id} className="flex items-center justify-between glass-card p-3 rounded-lg">
                      <div>
                        <h5 className="font-medium">{edu.degree}</h5>
                        <p className="text-sm text-foreground/70">{edu.institution}, {edu.year}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => editEducation(edu)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteEducation(edu.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Experience */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl flex items-center">
                <Briefcase className="mr-2 h-5 w-5" />
                Work Experience
              </CardTitle>
              {editingExperienceId && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setEditingExperienceId(null);
                    setExperience({
                      id: uuidv4(),
                      position: '',
                      company: '',
                      startDate: '',
                      endDate: '',
                      current: false,
                      description: '',
                    });
                  }}
                >
                  <X className="h-4 w-4 mr-1" /> Cancel Editing
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Senior Developer"
                      value={experience.position}
                      onChange={(e) => setExperience({...experience, position: e.target.value})}
                    />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Tech Solutions Inc."
                      value={experience.company}
                      onChange={(e) => setExperience({...experience, company: e.target.value})}
                    />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="June 2020"
                      value={experience.startDate}
                      onChange={(e) => setExperience({...experience, startDate: e.target.value})}
                    />
                  </FormControl>
                </FormItem>
                <div className="flex items-center space-x-4">
                  <FormItem className="flex-1">
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Present"
                        value={experience.endDate}
                        onChange={(e) => setExperience({...experience, endDate: e.target.value})}
                        disabled={experience.current}
                      />
                    </FormControl>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 pt-7">
                    <Input 
                      type="checkbox" 
                      className="w-4 h-4" 
                      id="current-position"
                      checked={experience.current}
                      onChange={(e) => {
                        const isCurrent = e.target.checked;
                        setExperience({
                          ...experience, 
                          current: isCurrent,
                          endDate: isCurrent ? '' : experience.endDate
                        });
                      }}
                    />
                    <FormLabel htmlFor="current-position" className="text-sm">Current Position</FormLabel>
                  </FormItem>
                </div>
                <FormItem className="col-span-full">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your responsibilities and achievements..."
                      className="min-h-[100px]"
                      value={experience.description}
                      onChange={(e) => setExperience({...experience, description: e.target.value})}
                    />
                  </FormControl>
                </FormItem>
              </div>
              
              <Button onClick={addExperience} className="w-full" variant="outline">
                <Plus className="h-4 w-4 mr-1" /> {editingExperienceId ? 'Update Experience' : 'Add Experience'}
              </Button>
              
              {aboutMe?.experience && aboutMe.experience.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="font-medium">Work Experience</h4>
                  {aboutMe.experience.map((exp) => (
                    <div key={exp.id} className="flex items-center justify-between glass-card p-3 rounded-lg">
                      <div>
                        <h5 className="font-medium">{exp.position}</h5>
                        <p className="text-sm text-foreground/70">{exp.company}</p>
                        <p className="text-xs text-foreground/60">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => editExperience(exp)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteExperience(exp.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button type="submit" className="w-full">
              <Save className="mr-2 h-4 w-4" /> Save About Me Information
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
};

export default AdminAboutMe;
