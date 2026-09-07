package com.bannerstudio;

import java.awt.Dimension;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import javax.imageio.ImageIO;
import javax.inject.Inject;
import net.runelite.client.ui.overlay.Overlay;
import net.runelite.client.ui.overlay.OverlayLayer;
import net.runelite.client.ui.overlay.OverlayPosition;

public class BannerStudioOverlay extends Overlay
{
	private final BannerStudioConfig config;
	private BufferedImage cached;
	private String cachedPath = "";

	@Inject
	BannerStudioOverlay(BannerStudioConfig config)
	{
		this.config = config;
		setPosition(OverlayPosition.TOP_LEFT);
		setLayer(OverlayLayer.ABOVE_WIDGETS);
	}

	@Override
	public Dimension render(Graphics2D graphics)
	{
		final String path = config.overlayPath() == null ? "" : config.overlayPath().trim();
		if (path.isEmpty())
		{
			return null;
		}
		if (!path.equals(cachedPath))
		{
			cachedPath = path;
			cached = read(path);
		}
		if (cached == null)
		{
			return null;
		}
		graphics.drawImage(cached, 0, 0, null);
		return new Dimension(cached.getWidth(), cached.getHeight());
	}

	private static BufferedImage read(String path)
	{
		try
		{
			return ImageIO.read(new File(path));
		}
		catch (Exception ignored)
		{
			return null;
		}
	}
}
