BEGIN;


CREATE TABLE IF NOT EXISTS public.exercise
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name text COLLATE pg_catalog."default" NOT NULL,
    primary_muscles muscle[] NOT NULL,
    secondary_muscles muscle[],
    image text COLLATE pg_catalog."default" NOT NULL,
    instructions text[] COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT exercise_pkey PRIMARY KEY (id),
    CONSTRAINT exercise_id_key UNIQUE (id)
);

ALTER TABLE IF EXISTS public.exercise
    ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.exercise
    IS 'predefined exercises';

CREATE TABLE IF NOT EXISTS public.fav_exercise
(
    user_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    exercise_id uuid NOT NULL,
    CONSTRAINT fav_exercise_pkey PRIMARY KEY (user_id, exercise_id)
);

ALTER TABLE IF EXISTS public.fav_exercise
    ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.fav_exercise
    IS 'user defined favourite exercise';

CREATE TABLE IF NOT EXISTS public.pb
(
    user_id uuid NOT NULL DEFAULT gen_random_uuid(),
    exercise_id uuid NOT NULL DEFAULT gen_random_uuid(),
    weight double precision NOT NULL,
    reps smallint NOT NULL,
    "order" smallint NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    workout_id uuid NOT NULL,
    CONSTRAINT pb_pkey PRIMARY KEY (user_id, exercise_id)
);

ALTER TABLE IF EXISTS public.pb
    ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.pb
    IS 'user defined pb for exercise. reason for order field is so can differentiate between what set the pb was in. eg a pb in set 1 is not a pb in set 2 and should not be applied to targets for that.';

CREATE TABLE IF NOT EXISTS public.plan
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    notes text COLLATE pg_catalog."default",
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT plan_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.plan
    ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.plan
    IS 'user defined plans';

CREATE TABLE IF NOT EXISTS public.plan_exercise
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    sets smallint,
    notes text COLLATE pg_catalog."default",
    plan_id uuid NOT NULL,
    exercise_id uuid NOT NULL,
    CONSTRAINT plan_exercise_pkey PRIMARY KEY (id),
    CONSTRAINT plan_exercise_id_key UNIQUE (id)
);

ALTER TABLE IF EXISTS public.plan_exercise
    ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.plan_exercise
    IS 'the exercise and related info specified in a plan';

CREATE TABLE IF NOT EXISTS public.set
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    workout_exercise_id uuid NOT NULL,
    weight double precision NOT NULL,
    reps smallint NOT NULL,
    "order" smallint NOT NULL,
    CONSTRAINT set_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.set
    ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.set
    IS 'set information from a specific workout_exercise';

CREATE TABLE IF NOT EXISTS public.workout
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    plan_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    duration smallint,
    CONSTRAINT workout_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.workout
    ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.workout
    IS 'a specific workout using a plan';

CREATE TABLE IF NOT EXISTS public.workout_exercise
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    workout_id uuid NOT NULL,
    exercise_id uuid NOT NULL,
    "order" smallint NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT workout_exercise_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.workout_exercise
    ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.workout_exercise
    IS 'a specific exercise performed in a workout';

ALTER TABLE IF EXISTS public.fav_exercise
    ADD CONSTRAINT fav_exercise_exercise_id_fkey FOREIGN KEY (exercise_id)
    REFERENCES public.exercise (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.pb
    ADD CONSTRAINT pb_exercise_id_fkey FOREIGN KEY (exercise_id)
    REFERENCES public.exercise (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.pb
    ADD CONSTRAINT pb_workout_id_fkey FOREIGN KEY (workout_id)
    REFERENCES public.workout (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.plan_exercise
    ADD CONSTRAINT plan_exercise_exercise_id_fkey FOREIGN KEY (exercise_id)
    REFERENCES public.exercise (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.plan_exercise
    ADD CONSTRAINT plan_exercise_plan_id_fkey FOREIGN KEY (plan_id)
    REFERENCES public.plan (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.set
    ADD CONSTRAINT set_workout_exercise_id_fkey FOREIGN KEY (workout_exercise_id)
    REFERENCES public.workout_exercise (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.workout
    ADD CONSTRAINT workout_plan_id_fkey FOREIGN KEY (plan_id)
    REFERENCES public.plan (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.workout_exercise
    ADD CONSTRAINT workout_exercise_exercise_id_fkey FOREIGN KEY (exercise_id)
    REFERENCES public.exercise (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.workout_exercise
    ADD CONSTRAINT workout_exercise_workout_id_fkey FOREIGN KEY (workout_id)
    REFERENCES public.workout (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;

END;
