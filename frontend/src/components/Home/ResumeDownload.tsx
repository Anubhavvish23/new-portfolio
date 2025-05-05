
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResumeDownloadProps {
  resumeFile?: string;
}

const ResumeDownload: React.FC<ResumeDownloadProps> = ({ resumeFile }) => {
  const { toast } = useToast();

  const handleDownload = () => {
    if (!resumeFile) {
      toast({
        title: "Resume not available",
        description: "Resume file has not been uploaded yet.",
        variant: "destructive",
      });
      return;
    }

    // Create an anchor element and trigger download
    const link = document.createElement('a');
    link.href = resumeFile;
    link.download = 'resume.pdf'; // Default name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download started",
      description: "Your resume download has started.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-6"
    >
      <Button 
        onClick={handleDownload}
        className="glass hover:bg-purple-dark/20 transition-colors flex items-center gap-2"
        disabled={!resumeFile}
      >
        {resumeFile ? (
          <>
            <Download size={18} />
            Download Resume
          </>
        ) : (
          <>
            <FileText size={18} />
            Resume Not Available
          </>
        )}
      </Button>
    </motion.div>
  );
};

export default ResumeDownload;
