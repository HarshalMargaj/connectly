"use client";

import ProfilePage from "@/app/(main)/profile/_components/ProfilePage";
import SavedPosts from "@/app/(main)/profile/_components/SavedPosts";
import UserComments from "@/app/(main)/profile/_components/UserComments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsDemo() {
	return (
		<div className="flex w-full flex-col gap-6">
			<Tabs defaultValue="posts">
				<TabsList>
					<TabsTrigger value="posts">Posts</TabsTrigger>
					<TabsTrigger value="saved">Saved</TabsTrigger>
					<TabsTrigger value="comments">Comments</TabsTrigger>
				</TabsList>
				<TabsContent value="posts">
					<ProfilePage />
				</TabsContent>
				<TabsContent value="saved">
					<SavedPosts />
				</TabsContent>
				<TabsContent value="comments">
					<UserComments />
				</TabsContent>
			</Tabs>
		</div>
	);
}
