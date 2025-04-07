CREATE TABLE `contacts` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `custom_fields` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`contact_id` text NOT NULL,
	`field_name` text NOT NULL,
	`field_type` text NOT NULL,
	`field_value` text,
	`field_object` text
);
