-- Create templates table
CREATE TABLE IF NOT EXISTS templates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    name TEXT NOT NULL,
    description TEXT,
    content JSONB NOT NULL,
    is_public BOOLEAN DEFAULT false,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create RLS policies
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- Policy for inserting templates (users can only insert their own templates)
CREATE POLICY "Users can insert their own templates"
    ON templates FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy for selecting templates (users can see their own templates and public templates)
CREATE POLICY "Users can view their own templates and public templates"
    ON templates FOR SELECT
    USING (auth.uid() = user_id OR is_public = true);

-- Policy for updating templates (users can only update their own templates)
CREATE POLICY "Users can update their own templates"
    ON templates FOR UPDATE
    USING (auth.uid() = user_id);

-- Policy for deleting templates (users can only delete their own templates)
CREATE POLICY "Users can delete their own templates"
    ON templates FOR DELETE
    USING (auth.uid() = user_id);

-- Create public templates view
CREATE OR REPLACE VIEW public_templates AS
    SELECT 
        t.id,
        t.name,
        t.description,
        t.created_at,
        u.email as user_email,
        COALESCE(
            (u.raw_user_meta_data->>'full_name')::text,
            split_part(u.email, '@', 1)
        ) as user_display_name
    FROM templates t
    LEFT JOIN auth.users u ON t.user_id = u.id
    WHERE t.is_public = true;

-- Create function to get user templates
CREATE OR REPLACE FUNCTION get_user_templates(user_id UUID)
RETURNS TABLE (
    id UUID,
    name TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    is_public BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.id,
        t.name,
        t.description,
        t.created_at,
        t.is_public
    FROM templates t
    WHERE t.user_id = user_id
    ORDER BY t.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 