package com.bannerstudio;

import net.runelite.client.config.Config;
import net.runelite.client.config.ConfigGroup;
import net.runelite.client.config.ConfigItem;

@ConfigGroup("clipbench")
public interface ClipBenchConfig extends Config
{
	@ConfigItem(
		keyName = "clipsUrl",
		name = "Clip bench URL",
		description = "Opens the standalone clip bench. Not the live studio unless you change it."
	)
	default String clipsUrl()
	{
		return "https://raw.githubusercontent.com/russellchristefer-droid/runescapebannerstudio/main/overlays/clips/alt1/index.html";
	}
}
