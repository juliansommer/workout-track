export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      exercise: {
        Row: {
          id: string
          image: string
          instructions: string[]
          name: string
          primary_muscles: Database["public"]["Enums"]["muscle"][]
          secondary_muscles: Database["public"]["Enums"]["muscle"][] | null
        }
        Insert: {
          id?: string
          image: string
          instructions: string[]
          name: string
          primary_muscles: Database["public"]["Enums"]["muscle"][]
          secondary_muscles?: Database["public"]["Enums"]["muscle"][] | null
        }
        Update: {
          id?: string
          image?: string
          instructions?: string[]
          name?: string
          primary_muscles?: Database["public"]["Enums"]["muscle"][]
          secondary_muscles?: Database["public"]["Enums"]["muscle"][] | null
        }
        Relationships: []
      }
      fav_exercise: {
        Row: {
          created_at: string
          exercise_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          exercise_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          exercise_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fav_exercise_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercise"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fav_exercise_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      pb: {
        Row: {
          created_at: string
          exercise_id: string
          order: number
          reps: number
          user_id: string
          weight: number
          workout_id: string
        }
        Insert: {
          created_at?: string
          exercise_id?: string
          order: number
          reps: number
          user_id?: string
          weight: number
          workout_id: string
        }
        Update: {
          created_at?: string
          exercise_id?: string
          order?: number
          reps?: number
          user_id?: string
          weight?: number
          workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pb_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercise"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pb_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pb_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workout"
            referencedColumns: ["id"]
          },
        ]
      }
      plan: {
        Row: {
          created_at: string
          id: string
          name: string
          notes: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "plan_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      plan_exercise: {
        Row: {
          exercise_id: string
          id: string
          notes: string | null
          plan_id: string
          sets: number | null
        }
        Insert: {
          exercise_id: string
          id?: string
          notes?: string | null
          plan_id: string
          sets?: number | null
        }
        Update: {
          exercise_id?: string
          id?: string
          notes?: string | null
          plan_id?: string
          sets?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "plan_exercise_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercise"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plan_exercise_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plan"
            referencedColumns: ["id"]
          },
        ]
      }
      set: {
        Row: {
          id: string
          order: number
          reps: number
          weight: number
          workout_exercise_id: string
        }
        Insert: {
          id?: string
          order: number
          reps: number
          weight: number
          workout_exercise_id: string
        }
        Update: {
          id?: string
          order?: number
          reps?: number
          weight?: number
          workout_exercise_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "set_workout_exercise_id_fkey"
            columns: ["workout_exercise_id"]
            isOneToOne: false
            referencedRelation: "workout_exercise"
            referencedColumns: ["id"]
          },
        ]
      }
      workout: {
        Row: {
          created_at: string
          duration: number | null
          id: string
          plan_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          duration?: number | null
          id?: string
          plan_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          duration?: number | null
          id?: string
          plan_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_exercise: {
        Row: {
          exercise_id: string
          id: string
          order: number
          workout_id: string
        }
        Insert: {
          exercise_id: string
          id?: string
          order: number
          workout_id: string
        }
        Update: {
          exercise_id?: string
          id?: string
          order?: number
          workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_exercise_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercise"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_exercise_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workout"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      muscle:
        | "abdominals"
        | "abductors"
        | "adductors"
        | "biceps"
        | "calves"
        | "chest"
        | "forearms"
        | "glutes"
        | "hamstrings"
        | "lats"
        | "lower back"
        | "middle back"
        | "neck"
        | "quadriceps"
        | "shoulders"
        | "traps"
        | "triceps"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
