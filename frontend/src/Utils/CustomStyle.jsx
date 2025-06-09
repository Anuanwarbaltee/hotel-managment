// themeStyles.js
export const getCustomStyles = (theme) => ({
    // Full page centered container (good for login or error pages)
    pageWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(2),
    },

    // Main form/card container
    formContainer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(4),
        borderRadius: theme.spacing(2),
        maxWidth: 550,
        width: '100%',
        boxShadow: theme.shadows[4],
    },

    // Common card layout (like for dashboard widgets or user panels)
    card: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(3),
        borderRadius: theme.spacing(2),
        boxShadow: theme.shadows[3],
        marginBottom: theme.spacing(3),
    },

    // Title/headings (like form headers or section titles)
    title: {
        fontWeight: theme.typography.h5.fontWeight,
        fontSize: theme.typography.h5.fontSize,
        textAlign: 'center',
        marginBottom: theme.spacing(2),
        color: theme.palette.text.primary,
    },

    // TextField style for forms
    textField: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },

    // Row layout for form actions (checkbox, links etc.)
    actionRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },

    // Submit or primary action buttons
    submitButton: {
        marginTop: theme.spacing(2),
        borderRadius: theme.spacing(1),
        textTransform: 'none',
    },

    // Outlined button style
    outlinedButton: {
        marginTop: theme.spacing(2),
        borderRadius: theme.spacing(1),
        textTransform: 'none',
        borderColor: theme.palette.divider,
        color: theme.palette.text.primary,
    },

    // Section wrapper (for content with a title and body)
    section: {
        marginBottom: theme.spacing(4),
    },

    // Common icon button layout (centered with spacing)
    iconButtonRow: {
        display: 'flex',
        gap: theme.spacing(2),
        justifyContent: 'center',
        marginTop: theme.spacing(1),
    },

    // Avatar circle style (can be reused for user icons, logos)
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        margin: 'auto',
        marginBottom: theme.spacing(2),
    },
});

