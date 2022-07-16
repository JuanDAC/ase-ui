-------------------------------------------------
-- Main module to AseGTK
--
-- @module AseGTK
-- @author JuanDAC
-- @license MIT
-------------------------------------------------
-- @class AseUI
AseUI = {
    menuBar = {},
    language = nil,
    LEFT_BASE_MENU_BAR = 230,
    AXIS_X_BASE_MENU_BAR = 0,
    TOP_BASE_MENU_BAR = -16
};

-- @type OptionsComponent
-- @field #string id - Id of the component (used to identify it)
-- @field #string text - Text of the component (used to display it)
-- @field #function onclick - Function to call when the component is clicked
-- @field #function onchange - Function to call when the component is changed
-- @field #boolean selected - If the component is selected or not
-- @field #boolean newrow - If the component is in a new row or not
-- @field #boolean visible - If the component is visible or not (if not, it will not be displayed)
-- @field #string option - Option by default of the component (used default selected)
-- @field #


-- @type Components_T
-- @field #string type - Component type (button, label, etc)
-- @field #OptionsComponent options - Component options (id, text, selected, onclick)

-- @type ConfigWindow_T
-- @field #string title - Window title
-- @field #function onclouse - Function to execute when the window is closed
-- @field #Components components - Components to add to the window
-- @usage local configWindow = { title = "Config", onclouse = function() end, components = {}}

-- @type LanguageOptions_T
-- @field #string [#string] - Table language to textContent
-- @usage local language = { ["en"] = "English", ["es"] = "Español" }

-- @function AseUI.New
-- @descrption Create a new AseUI instance
-- @param config {configWindow} - AseUI configuration
AseUI.New = function(static, config)
    local state = {
        id = tonumber(os.time()),
        ui = nil,
        firstRender = false,
        initDialog = {},
        componets = {},
        maximaze_config = {}
    };

    local instance = {
        -- @function AseUI.Constructor
        -- @param self AseUI instance
        -- @param config {title, onclouse, componets} - Configuration of the window
        -- @description Constructor of the window AseUI and create the window with the configuration given in the parameter config and return the window AseUI instance.
        -- @return AseUI instance
        Constructor = function(self, config)
            state.maximaze_config = static:GenetateMaximazeConfig{
                onclick = self:HandlerMaximaze(),
                title = config.title
            };
            return self
        end,
        -- @function AseUI.HandlerMaximaze
        -- @param self AseUI instance
        -- @description Handler of the event of the button maximaze.
        -- @return function handler of the event of the button maximaze within the AseUI instance.
        HandlerMaximaze = function(self)
            return function()
                self:RemoveWindowFromMenuBar();
                if AXIS_X_BASE_MENU_BAR ~= 0 then
                    AXIS_X_BASE_MENU_BAR = AXIS_X_BASE_MENU_BAR - state.ui.bounds.width;
                end
                self:Close();
                self:CreateInterface();
                self:BuildComponents();
                self:UpdateUIConfig{
                    bounds = self.maximazed_bounds
                };
                self:Render();
            end
        end,
        -- @function AseUI.HandlerMinimaze
        -- @param self AseUI instance
        -- @description Remove the window from the menu bar and return the window to the new menu bar.
        -- @return the new menu bar.
        RemoveWindowFromMenuBar = function(self)
            local newMenuBar = {}
            for _, window in pairs(static.menuBar) do
                if (state.id ~= window.id) then
                    table.insert(newMenuBar, window)
                end
            end
            static.menuBar = newMenuBar
            return static.menuBar
        end
    };

    return instance:Constructor(config);
end

-- @function AseUI.SelectByLanguage
-- @param self AseUI class 
-- @param field {LanguageOptions}
AseUI.SelectByLanguage = function(self, field)
    if type(field) == "table" then
        return field[self.language]
    end
    return field
end

AseUI.GenerateMaximazeConfig = function(self, config)
    return {
        id = "maximize",
        text = static:SelectByLanguage(config.title),
        selected = false,
        focus = false,
        onclick = config.onclick
    }
end

dlg:entry{
    id = "user_value",
    label = "User Value:",
    text = "Default User"
}
dlg:button{
    id = "confirm",
    text = "Confirm"
}
dlg:button{
    id = "cancel",
    text = "Cancel"
}
dlg:show()
local data = dlg.data
if data.confirm then
    app.alert("The given value is '" .. data.user_value .. "'")
end
