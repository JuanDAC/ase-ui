-------------------------------------------------
-- Main module to AseGTK
--
-- @module AseGTK
-- @author JuanDAC
-- @license MIT
-------------------------------------------------


-- decorators

--- Metaclass
local AseGTK = {
	id = nil,
	user_interface = nil,
	first_render = false,
	languages_option = nil,
	init_dialog = {},
	componets = {},
}

--- constructor: Method init of the Meta class
-- @param cls metamethods of InterfaceTabs
local constructor = function (cls, ...)
	local self = setmetatable({}, cls)
	return self
end

-------------------------------------------------
-- Indexing generally starts at
-- TUI (Curses) or GUI (GTK).
--
-- @within abstk
--
-- @param arg the mode
-------------------------------------------------
AseGTK.__index = function(self, key)
	-- to search in current instance
	local value_from_self = rawget(self, key)
	if (value_from_self) then
		return (value_from_self)
	end
	-- to search in class parent
	local value_from_class = rawget(AseGTK, key)
	if (value_from_class) then
		return (value_from_class)
	end

	-- to search in instance of Dialog instance
	--
	-- get prototype Dialog instance
	local dialog = rawget(self, "dialog") or {}
	-- get value of Dialog instance
	local value_from_dialog = dialog[key]
	if (type(value_from_dialog) == "function") then
		-- wrapper of the method Dialog
		return function (_, ...)
			if (arg ~= nil) then
				return value_from_dialog(dialog, table.unpack(arg))
			else
				return value_from_dialog(dialog)
			end
		end
	end
	return value_from_dialog
end

--- MetaMethods
-- @field __call
local MetaMethods = {
	__call = constructor
}

-- Set MetaMethods
setmetatable(AseGTK, MetaMethods)

-------------------------------------------------
-- Sets mode to determine whether UI will be drawn,
-- TUI (Curses) or GUI (GTK).
--
-- @within abstk
--
-- @param arg the mode
-------------------------------------------------
function AseGTK:draw()
	local init_dialog = {}
	-- if type(self.init_dialog.title) == "table" then
	init_dialog.title = "Titulo"
	-- end
	self.dialog = _G.Dialog(init_dialog);
end

-------------------------------------------------
--- Sets mode to determine whether UI will be drawn,
-- TUI (Curses) or GUI (GTK).
--
-- @within abstk
--
-- @param arg the mode
-------------------------------------------------
function AseGTK:render(_)
	self:show()
end

-------------------------------------------------
--- Constructs a Wizard.
--
-- @param title the title of the window
-- @param[opt=<code>600</code>] w the width of the window (only used in GUI)
-- @param[opt=<code>w*0.75</code>] h the height of the window (only used in GUI)
-- @param exit_callback a callback function to override the default confirmation
-- messagebox.
-- Receives `exit` (`"DONE"` or `"QUIT"`), `data` and `screen`. Must return `true` or `false`.
-- More info at [https://github.com/PedroAlvesV/AbsTK/wiki/Callbacks#exit-callback]
-- (https://github.com/PedroAlvesV/AbsTK/wiki/Callbacks#exit-callback)
--
-- @within AseGTK
--
-- @return  a Wizard.
-------------------------------------------------
function AseGTK:add_wizard(title, w, h, exit_callback)
end

-------------------------------------------------
--- Constructs a Screen. 
--
-- @param title the title of the screen
-- @param w the width of the screen (only used in GUI)
-- @param h the height of the screen (only used in GUI)
--
-- @within AseGTK
--
-- @return 	a Screen.
-------------------------------------------------
function AseGTK:new_screen(title, w, h)
end

AseGTK()



