import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

interface DialogDemoProps {
	open: boolean;
	setIsOpen: (value: boolean) => void;
	children: React.ReactNode;
	title: string;
	description: string;
}

export function DialogDemo({
	open,
	setIsOpen,
	children,
	title,
	description,
}: DialogDemoProps) {
	return (
		<Dialog open={open} onOpenChange={setIsOpen}>
			<form>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>{description}</DialogDescription>
					</DialogHeader>
					{children}
				</DialogContent>
			</form>
		</Dialog>
	);
}
