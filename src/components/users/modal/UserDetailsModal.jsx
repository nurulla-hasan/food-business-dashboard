import React, { Suspense } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogClose, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate, getInitials, getSkillsName, getSocialIcon } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar, Mail, Phone, MapPin, Info, Link as LinkIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const UserDetailsModal = ({ user, isOpen, onOpenChange, skills }) => {
    if (!user) return null
    const skillNames = getSkillsName(user.skills, skills);
    const displaySkills = (skillNames || []).filter(Boolean);

    return (
        <Suspense fallback={<div>Loading...</div>}>
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] md:max-w-2xl p-0">
                <DialogTitle className="sr-only">User Details</DialogTitle>
                <DialogDescription className="sr-only">User Details</DialogDescription>
                <div className="relative">
                    <img
                        src={user.cover_image || "https://placehold.co/600x200"}
                        alt="Cover"
                        className="w-[100%] h-32 object-cover rounded-t-lg"
                    />
                    <Avatar className="absolute top-16 left-1/2 -translate-x-1/2 w-24 h-24 border-4 border-white">
                        <AvatarImage src={user.profile_image} alt={user.name} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                </div>

                <div className="pt-8 text-center">
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-muted-foreground text-wrap">
                        {user.bio || "No bio available"}
                    </p>
                </div>

                <div className="p-4 grid gap-4 text-sm">
                    <InfoRow icon={<Mail className="h-5 w-5" />} label="Email" value={user.email} />
                    <InfoRow icon={<Phone className="h-5 w-5" />} label="Phone" value={user.phone} />
                    <InfoRow icon={<Calendar className="h-5 w-5" />} label="Date of Birth" value={formatDate(user.dateOfBirth)} />
                    <InfoRow icon={<MapPin className="h-5 w-5" />} label="Address" value={user.address} />

                    {user.socialLinks?.length > 0 && (
                        <div className="flex items-center gap-3">
                            <LinkIcon className="h-5 w-5 text-muted-foreground mt-1" />
                            <div className="flex flex-wrap gap-2">
                                {user.socialLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        {getSocialIcon(link)}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                            <Info className="h-5 w-5 text-muted-foreground" />
                            Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {displaySkills.length > 0 ? (
                                displaySkills.map((skill, index) => (
                                    <Badge variant="outline" key={index}>
                                        {skill}
                                    </Badge>
                                ))
                            ) : (
                                <p className="text-muted-foreground">No skills found.</p>
                            )}
                        </div>
                    </div>
                </div>

                <DialogFooter className="p-6 pt-0">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </Suspense>
    );
};

export default UserDetailsModal;

function InfoRow({ icon, label, value }) {
    return (
        <div className="flex items-center gap-3">
            {icon}
            <span className="font-medium text-muted-foreground">{label}:</span>
            <span className="truncate">{value || '—'}</span>
        </div>
    )
}

