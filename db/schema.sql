CREATE TABLE IF NOT EXISTS `attempts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`lesson_id` text NOT NULL,
	`question_id` text NOT NULL,
	`answer` text NOT NULL,
	`correct` integer NOT NULL,
	`created_at` integer NOT NULL
);

CREATE TABLE IF NOT EXISTS `completions` (
	`user_id` text NOT NULL,
	`lesson_id` text NOT NULL,
	`created_at` integer NOT NULL,
	PRIMARY KEY(`user_id`, `lesson_id`)
);

CREATE TABLE IF NOT EXISTS `conversations` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`scenario_id` text NOT NULL,
	`message` text NOT NULL,
	`reply` text NOT NULL,
	`feedback` text NOT NULL,
	`created_at` integer NOT NULL
);

CREATE TABLE IF NOT EXISTS `profiles` (
	`user_id` text PRIMARY KEY NOT NULL,
	`data` text NOT NULL,
	`updated_at` integer NOT NULL
);

CREATE TABLE IF NOT EXISTS `reviews` (
	`user_id` text NOT NULL,
	`card_id` text NOT NULL,
	`interval_days` integer DEFAULT 0 NOT NULL,
	`due_at` integer NOT NULL,
	PRIMARY KEY(`user_id`, `card_id`)
);

CREATE TABLE IF NOT EXISTS `usage` (
	`user_id` text NOT NULL,
	`window` integer NOT NULL,
	`count` integer NOT NULL,
	PRIMARY KEY(`user_id`, `window`)
);

CREATE TABLE IF NOT EXISTS level_assessments (
 id TEXT PRIMARY KEY NOT NULL,
 user_id TEXT NOT NULL,
 level TEXT NOT NULL,
 version TEXT NOT NULL,
 result TEXT NOT NULL,
 created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS assessment_user_time ON level_assessments(user_id, created_at);

CREATE TABLE IF NOT EXISTS login_attempts (bucket TEXT PRIMARY KEY, window INTEGER NOT NULL, count INTEGER NOT NULL);
