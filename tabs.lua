---------------------------------------
--- A InterfaceTabs class
-- @type InterfaceBar

-- Meta class
InterfaceTabs = {
	tapsCollection = {}
}

-- Add indexed in Meta class
InterfaceTabs.__index = InterfaceTabs

local Constructor = {
	__call = function (cls, ...)
		local self = setmetatable({}, cls)
		self:_init(...)
		return self
	end,
}
-- Set meta table
setmetatable(InterfaceTabs, Constructor)

-- _init. Method init of the Meta class
-- @author JuanDAC
function InterfaceTabs:_init()
	-- pass
end

-- pop. Remove the id window of the tabs
-- @author JuanDAC
-- @int id
-- @param id Window identifier number
function InterfaceTabs:pop(id)
	newTabs = {}
	for i, item in ipairs(self.tapsCollection) do
		if item.id == id then
			goto Continue
		end
		newTabs[#newTabs] = item
		::Continue::
	end
	self.tapsCollection = newTabs
end

-- add. Add window to collection taps
-- @author JuanDAC
-- @Window window
-- @param window Current window to add
function InterfaceTabs:add(window)
	self.tapsCollection[#self.tapsCollection] = window
end
