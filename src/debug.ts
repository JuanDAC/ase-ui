
export const development = tostring(app.params['env' as keyof typeof app.params]) === 'development';